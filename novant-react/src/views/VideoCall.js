import React, { Component } from 'react';
import Video from 'twilio-video';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import MessageService from '../services/MessageService';
import authService from '../services/auth.service';
import { useParams } from 'react-router-dom';

class VideoCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      identity: null,
      peerUserId: 0,
      peerIdentity: '',
      roomName: 'devdigital',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      hasParticipantsJoinedRoom: false,
      activeRoom: '', // Track the current active room
      jwt: '',
    };

    this.joinRoom = this.joinRoom.bind(this);
    this.roomJoined = this.roomJoined.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
    this.detachTracks = this.detachTracks.bind(this);
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
    const user = authService.getCurrentUser();
    const transmitter = user['id'];
    const m = MessageService;
    const userProf = m.getUser(transmitter);
    // console.log(userProf)

    const userName1 = userProf.firstName + ' ' + userProf.lastName;
    const currentUserName = transmitter;
    const {
      match: { params },
    } = this.props;
    const receiver = params.userck;
    console.log(receiver);
    this.setState({ roomName: receiver });
    // console.log(receiver+'hhhhhhhhhhhhhhhh')
    axios
      .get('https://mycubicle.herokuapp.com/token/' + currentUserName)
      .then((results) => {
        const { identity, jwt } = results.data;
        this.setState(
          {
            identity,
            jwt,
          },
          () => {
            if (jwt.length === 0 || identity.length === 0) {
              ToastsStore.error('Issue to fetch token!');
            } else {
              this.setState({ userName: currentUserName });
              this.joinRoom();
            }
          }
        );
      });
  }

  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName,
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.jwt, connectOptions).then(
      this.roomJoined,
      (error) => {
        ToastsStore.error('Please verify your connection of webcam!');
        ToastsStore.error('Webcam-Video permission should not block!');
      }
    );
  }

  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach());
    });
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values());
    this.attachTracks(tracks, container);
  }

  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove();
      });
    });
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values());
    this.detachTracks(tracks);
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true,
    });

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.refs.groupChat_localMedia;
    console.log(
      'previewContainer.querySelector(video)',
      previewContainer.querySelector('.video')
    );

    if (!previewContainer.querySelector('.video')) {
      this.attachParticipantTracks(
        room.localParticipant,
        this.refs.groupChat_localMedia
      );
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      console.log("Already in Room: '" + participant.identity + "'");
      this.setState({
        peerIdentity: participant.identity,
      });
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      console.log("Joining: '" + participant.identity + "'");
      this.setState({
        peerIdentity: participant.identity,
        partnerConnected: true,
      });
    });

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      console.log(participant.identity + ' removed track: ' + track.kind);
      this.detachTracks([track]);
    });

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.state.activeRoom = null;
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
    });
  }

  leaveRoom() {
    this.state.activeRoom.disconnect();
    this.setState({
      hasJoinedRoom: false,
      localMediaAvailable: false,
      peerIdentity: '',
    });
  }

  render() {
    /* Hide 'Join Room' button if user has already joined a room */
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <button className='btn btn-warning' onClick={this.leaveRoom}>
        {' '}
        Leave Room
      </button>
    ) : (
      <></>
    );
    /** */

    return (
      <React.Fragment>
        <link href='../assets/css/global.css' rel='stylesheet' />
        <div
          style={{
            backgroundColor: '#333333',
            backgroundSize: 'cover',
            height: '100vh',
            width: '100%',
          }}
        >
          <div className='container'>
            {!this.state.hasJoinedRoom && (
              <div className='row'>
                <div className='col-3 form-inline'></div>
              </div>
            )}
            <div className='row mt-3'>
              <div className='col-3'>
                <div className='card'>
                  <div className='card-body'>
                    <div ref='groupChat_localMedia'></div>
                    <div className='text-center'>
                      {!this.state.hasJoinedRoom && (
                        <Loader type='Puff' color='#00BFFF' />
                      )}
                    </div>
                  </div>
                  <div className='card-footer'>
                    {this.state.hasJoinedRoom ? (
                      <button
                        className='btn btn-danger'
                        onClick={this.leaveRoom}
                      >
                        {' '}
                        Leave
                      </button>
                    ) : (
                      <span>&nbsp;</span>
                    )}{' '}
                  </div>
                </div>
              </div>
              <div className='col-9'>
                <div className='card'>
                  <div className='card-body'>
                    <div ref='remoteMedia'></div>
                    <div className='text-center'>
                      {!this.state.hasParticipantsJoinedRoom &&
                        !this.state.peerIdentity && (
                          <Loader type='Puff' color='#00BFFF' />
                        )}
                    </div>
                  </div>
                  <div className='card-footer text-center'>
                    {!this.state.hasParticipantsJoinedRoom &&
                    !this.state.peerIdentity ? (
                      <span>Wait for peer user to connect channel !!!</span>
                    ) : (
                      <span>
                        Peer User Name : {`${this.state.peerIdentity}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastsContainer store={ToastsStore} />
      </React.Fragment>
    );
  }
}

export default VideoCall;
