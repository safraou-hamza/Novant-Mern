import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Col, Container, Row } from "react-bootstrap";
import { Label } from "@material-ui/icons";
import authService from "../../services/auth.service";
import experienceService from "../../services/experience.service";
import axios from "axios";

function SetAboutME() {
  const user = authService.getCurrentUser();
    const userid = user['id'];
    const [CoverImage, setCoverImage] = useState('');
    const [selectedCoverImage, setselectedCoverImage] = useState(null);

    const [ProfileImage, setProfileImage] = useState('');
    const [selectedProfileImage, setselectedProfileImage] = useState(null);

    const onChangeHandler = event => {
      setselectedCoverImage(event.target.files[0])
      setCoverImage((event.target.files[0].name))
      //  event.target.files = null
      //console.log(event.target.files)
  }

  const onChangeHandler1 = event => {
    setselectedProfileImage(event.target.files[0])
    setProfileImage((event.target.files[0].name))
    //  event.target.files = null
    //console.log(event.target.files)
}

  return (
    
      <Card>
        <CardContent>
          <Formik
            initialValues={{ birthday :"" ,firstname :"" , lastname :"" , email :"", password :"" , profileimage :"" , coverimage :"" ,adresse: "", phone: '', description: "" }}
            validationSchema={Yup.object().shape({
            })}
            onSubmit={(values, { setSubmitting }) => {
              if (selectedCoverImage != null) {
                const data = new FormData()
                data.append('file', selectedCoverImage)
                var randomstring = require("randomstring");
                var date = randomstring.generate();
                axios.post("http://localhost:3001/upload/" + date, data, {
                })
              }

              if (selectedProfileImage != null) {
                const data = new FormData()
                data.append('file', selectedProfileImage)
                var randomstring = require("randomstring");
                var date1 = randomstring.generate();
                axios.post("http://localhost:3001/upload/" + date1, data, {
                })
              }


              experienceService.edit(values.firstname, 
                values.lastname, date1+'-'+ProfileImage,
                date+'-'+CoverImage,values.birthday.toString(),values.password,values.email,values.adresse,values.phone,
                values.description,userid).then(
                () => {
                  window.location.reload();
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              validateField,
              /* and other goodies */
            }) => (
              
              <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}
              validateField={validateField}
              errors={errors}
              touched={touched}>
                
                <Grid container spacing={2} > 
                  
                <Grid item xs={12} md={3}>
                <Label/><Typography>First Name :</Typography>     
                </Grid>    
                
                <Grid item xs={12} md={9}>
                  <Field
                  style={{width:"100%"}}
                    type="text"
                    name="firstname"
                    id="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    placeholder="Your Firstname"
                    component={TextField}
                    error={errors.firstname ? true : false}
                    helperText={errors.firstname && errors.firstname}
                  />
                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>

                  <Grid item xs={12} md={3}>
                <Label/><Typography>Last Name :</Typography>     
                </Grid> 
                  
                  <Grid item xs={12} md={9}>
                  <Field
                  style={{width:"100%"}}
                    type="text"
                    name="lastname"
                    id="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                    placeholder="Your Lastname"
                    component={TextField}
                    error={errors.lastname ? true : false}
                    helperText={errors.lastname && errors.lastname}
                  />
                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>


                  <Grid item xs={12} md={3}>
                <Label/><Typography>Password :</Typography>     
                </Grid>      
                

                  <Grid item xs={12} md={9}>

                  <Field
                  style={{width:"100%"}}
                    label="password"
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Your password"
                    component={TextField}
                    error={errors.password ? true : false}
                    helperText={errors.password && errors.password}
                  />
                  
                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>

                  <Grid item xs={12} md={3}>
                <Label/><Typography>Cover Image :</Typography>     
                </Grid>      
                
                  <Grid item xs={12} md={9}>
                        <div style={{ width: '100%', maxHeight: '100px' }}>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" value={values.coverimage} id="coverimage" error={errors.coverimage ? true : false}
                    helperText={errors.coverimage && errors.coverimage} onChange={onChangeHandler} />
                                <label className="custom-file-label" for="coverimage">Choose file...</label>
                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                        </div>

                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>
                
                  <Grid item xs={12} md={3}>
                <Label/><Typography>Profile Image :</Typography>     
                </Grid>  

                <Grid item xs={12} md={9}>
                        <div style={{ width: '100%', maxHeight: '100px' }}>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" value={values.profileimage} id="profileimage" error={errors.profileimage ? true : false}
                    helperText={errors.profileimage && errors.profileimage} onChange={onChangeHandler1} />
                                <label className="custom-file-label" for="profileimage">Choose file...</label>
                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                        </div>

                  </Grid>    
                

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>
                  <Grid item xs={12} md={3}>
                <Label/><Typography>Email :</Typography>     
                </Grid>   
                
                  <Grid item xs={12} md={9}>
                     
                  <Field
                  style={{width:"100%"}}
                    label="email"
                    type="text"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Your email"
                    component={TextField}
                    error={errors.email ? true : false}
                    helperText={errors.email && errors.email}
                  />
                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>

                  <Grid item xs={12} md={3}>
                <Label/><Typography>Adresse :</Typography>   
                  
                </Grid>   
                

                  <Grid item xs={12} md={9}>

                  <Field
                  style={{width:"100%"}}
                    label="adresse"
                    type="text"
                    name="adresse"
                    id="adresse"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.adresse}
                    placeholder="Your adresse"
                    component={TextField}
                    error={errors.adresse ? true : false}
                    helperText={errors.adresse && errors.adresse}
                  />
                  </Grid>
                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>
                  <Grid item xs={12} md={3}>
                <Label/><Typography>Phone :</Typography>     
                </Grid>   
                

                  <Grid item xs={12} md={9}>

                  <Field
                  style={{width:"100%"}}
                  label="phone"
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder="Your phone"
                    component={TextField}
                    error={errors.phone ? true : false}
                    helperText={errors.phone && errors.phone}
                  />
                  </Grid>

                  <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>

                  <Grid item xs={12} md={3}>
                <Label/><Typography>Birthday :</Typography>     
                </Grid>   
                
                  <Grid item xs={12} md={9}>

                  <Field
                  style={{width:"100%"}}
                    label="birthday"
                    type="date"
                    name="birthday"
                    id="birthday"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.birthday}
                    placeholder="Your birthday"
                    component={TextField}
                    error={errors.birthday ? true : false}
                    helperText={errors.birthday && errors.birthday}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>
                <Grid item xs={12} md={3}>
                <Label/><Typography>Description :</Typography>     
                </Grid>   
                
                <Grid item xs={12} md={9}>

                  <Field
                  style={{width:"100%"}}
                  label="description"
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Description"
                    component={TextField}
                    error={errors.description ? true : false}
                    helperText={errors.description && errors.description}
                  />
                                 </Grid>
                                 <Grid item xs={12} md={12}>
                <Divider variant='fullWidth'/>
                </Grid>

                <Button
          type="submit"
          variant="contained"
          color="primary"
         
        >
          Confirm
        </Button>
        </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
              );

 
};

export default SetAboutME;