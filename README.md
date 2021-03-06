<br/>
<div align="center">

  <h3 align="center">Application for goal tracking for cardiology patients</h3>

  <div flex-direction="row">
    <img src="documentation/images/ruby.png" alt="Ruby" width="50" />
    <img src="documentation/images/rails.png" alt="Rails" width="100" />
    <img src="documentation/images/react.png" alt="React" width="50" />
  </div>
  <br/>
</div>

<details>
  <summary>Index</summary>
  <ol>
    <li>
      <a href="#cardiology-web-app">Cardiology Web App</a>
      <ul>
        <li><a href="#need-source">Need Source</a></li>
        <li><a href="#demanding-company">Demanding Company</a></li>
        <li><a href="#summarized-idea">Summarized Idea</a></li>
      </ul>
    </li>
    <li>
      <a href="#data-model">Data Model</a>
      <ul>
        <li><a href="#entities">Entities</a></li>
        <li><a href="#relationships">Relationships</a></li>
      </ul>
    </li>
    <li>
      <a href="#user-requirements">User Requirements</a>
      <ul>
        <li><a href="#user-cases">User Cases</a></li>
      </ul>
    </li>
    <li>
      <a href="#system-functioning-and-requirements">System requirements and functioning</a>
    </li>
    <li>
      <a href="#interfaces">Interfaces</a>
      <ul>
        <li><a href="#usability">Usability</a></li>
        <ul>
          <li><a href="#visual-design">Visual design</a></li>
          <li><a href="#error-handling">Error handling</a></li>
          <li><a href="#notifications-for-the-user">Notifications for the user</a></li>
          <li><a href="#font">Font</a></li>
          <li><a href="#user-customization">User customization</a></li>
          <li><a href="#interfaces-display">Interfaces display</a></li>
          <li><a href="#text-redaction">Text redaction</a></li>
          <li><a href="#multimedia-aspect">Multimedia aspect</a></li>
          <li><a href="#summary">Summary</a></li>
        </ul>
      </ul>
    </li>
    <li>
      <a href="#guides">Guides</a>
      <ul>
        <li><a href="#installation-guide">Installation guide</a></li>
        <ul>
          <li><a href="#first-of-all">First of all</a></li>
          <li><a href="#backend">Backend</a></li>
          <li><a href="#frontend">Frontend</a></li>
          <li><a href="#reports-and-app-help-system">Reports and App Help System</a></li>
          <li><a href="#starting-the-app">Starting the app</a></li>
        </ul>
        <li><a href="#use-guide">Use guide</a></li>
      </ul>
    </li>
    <li>
      <a href="#technologies-comparison">Technologies comparison</a>
      <ul>
        <li><a href="#react">React</a></li>
        <li><a href="#ruby-on-rails">Ruby on Rails</a></li>
        <li><a href="#postgresql">PostgreSQL</a></li>
      </ul>
    </li>
    <li>
      <a href="#work-planning">Work Planning<a>
    </li>
    <li>
      <a href="#conclusion-and-opinion">Conclusion and opinion</a>
    </li>
    <li>
      <a href="#repositories-and-links-used">Repositories and links used</a>
    </li>
  </ol>
</details>

# Cardiology Web App
Welcome to the -*Cardiology patients' goal tracking app*-, an application created to make the medical process of creating and sending follow-ups easier.<br/>
This app can be used by either doctors and patients. The firts ones can create parameters and templates that will later be used to create follow-ups for the patients.<br/>
The patients then can check their follow-ups and fill the assigned parameters.

### Need Source
Nowadays, this entire process can be tedious and slow.<br/>
The patients have to go to the hospital to take their follow-ups, complete them and then go back to see the doctor.<br/>
In some cases, you may not want the patients to come to the hospital, maybe it's not good for them, but it is the only way.<br/>
<br/>
That's what we try to solve here.

### Demanding Company
This project has been developed by the demmand of *Usabi*.

### Summarized Idea
The idea is to create an app so the communication between doctors and patients (as well as the follow-ups that a patient must do) easier, faster and smoother for everyone.
<br/>

# Data Model
Let's now see how the database was made, the entities and relationships that exist and all the attributes.

### Entities
For this project, I created eight entities: *User*, *Doctor*, *Patient*, *Parameter*, *Followuptemplate*, *Followup*, *Answer* and *Hospital*.<br/><br/>
<div align="center">
  <img src="documentation/images/entity_relationship.PNG" width="600px" alt="er" />
</div>
<br/><br/>
They all have a unique 'id'.<br/>
Here is a list about the attributes for each entity:<br/>
<ol>
  <li>
    User:
    <ul>
      <li>email: String</li>
      <li>password: String</li>
      <li>rol: String</li>
    </ul>
  </li>
  <li>
    Doctor
    <ul>
      <li>name: String</li>
      <li>phoneNumber: Integer</li>
    </ul>
  </li>
  <li>
    Patient:
    <ul>
      <li>name: String</li>
      <li>clinicRecord: String</li>
      <li>gender: String</li>
      <li>birthDate: String</li>
      <li>phoneNumber: Integer</li>
      <li>consentRGPD: Boolean</li>
      <li>linkDevice: Boolean</li>
    </ul>
  </li>
  <li>
    Parameter:
    <ul>
      <li>name: String</li>
      <li>kind: String</li>
      <li>frequency: String</li>
    </ul>
  </li>
  <li>
    Followuptemplate:
    <ul>
      <li>name: String</li>
    </ul>
  </li>
  <li>
    Followup
    <ul>
      <li>startDate: String</li>
      <li>endDate: String</li>
    </ul>
  </li>
  <li>
    Answer
    <ul>
      <li>value: String</li>
      <li>timestamp: Timestamp</li>
    </ul>
  </li>
  <li>
    Hospital
    <ul>
      <li>name: String</li>
    </ul>
  </li>
</ol>

### Relationships
As you could have seen in the diagram before, these are the existing relationships and tables they generate (in case of needed):<br/>
<ol>
  <li>Hospital: It has a 'one to many' relation with almost every entity. For this, we have to add a "hospital_id" to:
    <ul>
      <li>Doctor</li>
      <li>Patient</li>
      <li>Parameter</li>
      <li>Followuptemplate</li>
      <li>Followup</li>
      <li>Answer</li>
    </ul>
  </li>
  <li>Both Doctor and Patient need a "user_id", having a certain 'User' the possibility of being one doctor or one patient.</li>
  <li>Parameter and Followuptemplate form a 'many to many' relation, generating the table "Followuptemplate_Parameter" with these two attributes:
    <ul>
      <li>followuptemplate_id: Reference</li>
      <li>parameter_id: Reference</li>
    </ul>
  </li>
  <li>Followup has another three 'one to many' relationships with 'Doctor', 'Patient' and 'Followuptemplate' generating the next attributes:
    <ul>
      <li>doctor_id: Reference</li>
      <li>patient_id: Reference</li>
      <li>followuptemplate_id: Reference</li>
    </ul>
  </li>
  <li>Answer has two more 'one to many' relationships with 'Parameter' and 'Followup':
    <ul>
      <li>parameter_id: Reference</li>
      <li>followup_id: Reference</li>
    </ul>
  </li>
</ol>
<br/>
<div align="center">
  <img src="documentation/images/classDiagram.PNG" width="500px" alt="Class" />
</div>
<div align="center">
  <img src="documentation/images/RelationalDiagram.PNG" width="500px" alt="Relational" />
</div>

# User Requirements
<ol>
  <li>
    Platform
    <ul>
      <li>The project will be a web app.</li>
    </ul>
  </li>
  <li>
    Main purpose
    <ul>
      <li>Allow doctors to create follow-ups for the patients.</li>
      <li>Allow patients to fill their follow-ups with their responses.</li>
      <li>Allow doctors to check those responses.</li>
    </ul>
  </li>
  <li>
    Interfaces needed
    <ul>
      <li>Sign in page (doctors and patients)</li>
      <li>Sign up page (doctors and patients)</li>
      <li>Profile page (doctors and patients)</li>
      <li>Profile update page (doctors and patients)</li>
      <li>Parameter view and create page (doctors)</li>
      <li>Parameter update and delete page (doctors)</li>
      <li>Template view and create page (doctors)</li>
      <li>Template update and delete page (doctors)</li>
      <li>Follow-up create page (doctor)</li>
      <li>One patient follow-ups (patients)</li>
      <li>Patient info visualizer with the follow-ups (doctors)</li>
      <li>Follow-up visualizer with answers and delete option (doctors)</li>
      <li>Follow-up visualizer with view, create and update answers (patients)</li>
    </ul>
  </li>
</ol>

### User Cases
<div align="center">
  <img src="documentation/images/useCaseDiagram.PNG" width="400px" alt="useCase" />
</div>

# System functioning and requirements
We could say that this project is divided in three parts:<br/>
<ol>
  <li>Frontend / Web Client: Made using React</li>
  <li>Backend / API: Made using Rails</li>
  <li>Database: Made with PostgreSQL</li>
</ol>

###
When using the app, you interact directly with the *Web Client*.<br/>
This provides a good looking, easy way to manage and check the information from the *database* and allow us to do every action that we need in a way that everyone can understand.<br/>
However, there is still one step in between the *Web Client* and the *database*. And that is the *API*.<br/>
The *API* acts like an interpreter between the other two parts of the project.<br/> 
It communicates with the *database* in a certain way it understands (SQL sentences) and also transforms all what have to do with the tables and the relathionships between them into objects to make it easier for the *Web Client* to understand.<br/>
<br/>
<img src="documentation/images/function.PNG" alt="Function-Diagram" />

###
To run this app you can use whatever computer you have and having the necessary tools installed.<br/>
Then you can access the *Web Client* with your same computer or using even your phone.

# Interfaces
Now, you can see some screenshots of the project interfaces *(these may change in future versions)*:<br/>
<ol>
  <li>Login</li>
  <br/>
  <ul>
    <img src="documentation/images/login.PNG" alt="login" />
  </ul>
  <li>Register</li>
  <br/>
  <ul>
    <img src="documentation/images/register.PNG" alt="register" />
  </ul>
  <li>Google Register</li>
  <br/>
  <ul>
    <img src="documentation/images/gRegister.PNG" alt="gRegister" />
  </ul>
  <li>Patient Profile</li>
  <br/>
  <ul>
    <img src="documentation/images/patientP.PNG" alt="patientP" />
  </ul>
  <li>Patient Update</li>
  <br/>
  <ul>
    <img src="documentation/images/patientU.PNG" alt="patientU" />
  </ul>
  <li>Doctor Profile</li>
  <br/>
  <ul>
    <img src="documentation/images/doctorP.PNG" alt="doctorP" />
  </ul>
  <li>Doctor Update</li>
  <br/>
  <ul>
    <img src="documentation/images/doctorU.PNG" alt="doctorU" />
  </ul>
  <li>Parameter Page</li>
  <br/>
  <ul>
    <img src="documentation/images/parameterP.PNG" alt="parameterP" />
  </ul>
  <li>Parameter Update</li>
  <br/>
  <ul>
    <img src="documentation/images/parameterU.PNG" alt="parameterU" />
  </ul>
  <li>Template Page</li>
  <br/>
  <ul>
    <img src="documentation/images/templateP.PNG" alt="templateP" />
  </ul>
  <li>Template Update</li>
  <br/>
  <ul>
    <img src="documentation/images/templateU.PNG" alt="templateU" />
  </ul>
  <li>Patient Visualizer (doctor)</li>
  <br/>
  <ul>
    <img src="documentation/images/patientV.PNG" alt="patientV" />
  </ul>
  <li>Follow-Up Create</li>
  <br/>
  <ul>
    <img src="documentation/images/followupC.PNG" alt="followupC" />
  </ul>
  <li>Follow-Ups List (patient)</li>
  <br/>
  <ul>
    <img src="documentation/images/followupL.PNG" alt="followupL" />
  </ul>
  <li>Follow-Up Page (doctor)</li>
  <br/>
  <ul>
    <img src="documentation/images/followupD.PNG" alt="followupD" />
  </ul>
  <li>Follow-Up Page (patient)</li>
  <br/>
  <ul>
    <img src="documentation/images/followupP.PNG" alt="followupP" />
  </ul>
</ol>


### Usability
*(All the following aspects may change in future versions)*<br/>
<br/>
The app was created trying to make it *simple*. Its visual design and elements were made with this idea.<br/>
<br/>
You can easily navigate and access everything and nothing is hard to find.

#### Visual Design
For this app, I've used some green colors, as this may reasemble a clinic or hospital:<br/>
<ol>
  <li>White (#fff)</li>
  <li>Light green (#76f3ad)</li>
  <li>Dark green (#37ba78)</li>
  <li>Medium grey (#353535)</li>
</ol>
<br/>
<img src="documentation/images/doctorP.PNG" alt="colors" />

#### Error handling
Errors should not normally happen during the normal use of the app.<br/>
However, if some happened (such as a bad login), this should be correctly handled and the app won't lock.
<div align="center">
  <img src="documentation/images/loginFail.PNG" alt="fail" />
</div>


#### Notifications for the user
Users will also be notified when te haven't filled a form field or when the app starts processing some kind of request.<br/>
<div flex-direction="row" align="center">
  <img src="documentation/images/formControl.PNG" alt="formControl" width="400" />
  <img src="documentation/images/spinner.PNG" alt="spinner" width="300" />
</div>


#### Font
For this project I used *Abel* (A Google Font).<br/>
This is a modern interpretation of sans serif.<br/>
It was originally used for newspaper headlines and posters. Its angled terminals and spiked stems give it enough style to be unique at display sizes, while its mono-weight still works well at smaller text sizes.

#### User customization
The most interesting aspect to comment here is the *profile image*.<br/>
<div flex-direction="row" align="center">
  <img src="documentation/images/img.PNG" src="img" />
  <img src="documentation/images/editImg.PNG" src="imgEdit" />
</div>

#### Interfaces display
They are consistent. As you could have seen before, there are certain paterns thaht repeat themselves.<br/>
This makes it easier for the user to navigate and use the app, as well as making the learning process faster.

#### Text redaction
Every text is small, short, easy to read.<br/>
If there was a lot of text, the user could get tired more easily, so we can make the experience more comfortable by using small texts.

#### Multimedia aspect
The only *multimedia aspect* we can found are the profile images.

#### Summary
Again, all these things were made with simplicity in mind. Looking for an esay and fast way to do everything while keeping good aesthetic.

# Guides
Next, I will address the guides necessary to install and get the project running:

## Installation guide

### First of all
To get this app running you'll need to install *NodeJS*, *Yarn*, *Ruby 2.6.8* with *Rails 6.1* and *PostgreSQL* (I use PostgreSQL 14).<br/>
<br/>
Here you have some links:<br/>
[ - NodeJS Download](https://nodejs.org/es/)<br/>
[ - Ruby Download](https://rubyinstaller.org/downloads/)<br/>
[ - Ruby on Rails Installation Tutorial](https://guides.rubyonrails.org/getting_started.html)<br/>
[ - PostgreSQL Download](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)<br/>
<br/>
After installing *NodeJS*, run the following command to install *Yarn*:<br/>
```
npm install -g yarn
```

###
Once you have everything downloaded and installed you'll need to run a few things in the command prompt.<br/>
I recommend using the *Git Bash*. It's comfortable and shouldn't give you any problem.<br/>
<br/>
[ - Git Download](https://git-scm.com/downloads)

### Backend
The Backend is created with *Ruby on Rails* and uses *PostgreSQL* for the database.<br/>
<br/>
*Ruby* is an interpreted, high-level programming language designed with an emphasis on programming productivity and simplicity.<br/>
*Rails* is a model-view-controller framework for *Ruby*. It is used to create server-side web applications.<br/>
*PostgreSQL* is one of the biggest relational database management systems. It emphasizes extensibility and SQL compliance.<br/>
<br/>
In the <a href="cardiology_backend">cardiology_backend</a> folder you need to run ```bundle install```.<br/>
If the bash doesn't recognize *bundle*, try running ```gem install bundler``` first.<br/>
<br/>
Then, head to <a href="cardiology_backend/config">config</a> and delete ```credentials.yml.enc```.<br/>
Now, run the command ```EDITOR=nano rails credentials:edit``` and add the next code:<br/>
```
devise:
  jwt_secret_key: <rails secret>
```
Where it says *rails secret* you have to put the secret code that the API will use in the encryptation of user credentials.<br/>
You can generate that secret code of your own by running that same command in the bash:<br/>
```
rails secret
```
To save and close the file, press *Ctrl+X*, *Y* and then *Enter*.<br/>
<br/>
Also, you will have to create a file called ```application.yml``` inside the <a href="cardiology_backend/config">config</a> folder.<br/>
To do so run the command ```bundle exec figaro install```.<br/>
In that file, you will have to write the following:<br/>
```
development:
  host_postgres: your_host
  port_postgres: "your_port"
  username_postgres: your_user
  password_postgres: your_password
```
This is done this way for security reasons, keeping all your *PostgreSQL* information in private.<br/>
<br/>
Lastly, run ```rails db:setup``` and it will generate the entire database for you. It will be empty, though.<br/>
<br/>
If you want to insert some test data into the database (Not necessary) I recomend using Postman.<br/>
To do almost every request to the database, you need to have an *auth token*. So, you'll have to sign up and sign in first.

###
[ - Postman Download](https://www.postman.com/downloads/)<br/>

### Frontend
This is a *React* frontend.<br/>
*React* is a JavaScript library for building user interfaces based on UI components.<br/>
<br/>
The *frontend* preparation is easy. You just have to access <a href="cardiology_frontend">cardiology_frontend</a> and run ```npm install```.<br/>
<br/>
You don't need to have any data already in the *database* you will be able to do every action since the beginning from here.


### Reports and App Help System
Apart from the *Backend* and *Frontend*, there are two more folders necessary for the complete functioning of the app.<br/>
<ol>
  <li>
    <a href="jsreport">Jsrepot</a>: Here is the server and templates for the reports you can access in the app (mostly if you are a doctor).<br/>
    To get it running, go inside the folder and run ```npm start```.
  </li>
  <li>
    <a href="Build html documentation">Help System</a>: This is the help system. For this case, I used the Visual Studio Code extension 'Live Server'. Just place yourself in any html of the folder and execute the server.
    <img src="documentation/images/liveServer.PNG" alt="live-server" /><br/>
    <br/>
    I'll recommend you to run the 'live server' in a new window of Visual Studio Code.
  </li>
</ol>


### Starting the app
Both *Rails* and *React* uses port 3000. However, this is not a problem.<br/>
<br/>
Run the *backend* with ```rails s```.<br/>
It is possible that running ```rails s``` throughs you an error the first time. The terminal will require you to run ```yarn install --check-files```. Do so and then you should be able to run the server as normally.<br/>
<br/>
Then, run *React* using ```npm start```. It will ask to auto-select another port. Press *Y* and the app should start.

## Use guide
You first need to Login (or create an account if you don't have one).<br/>
Now, the number of things you can do depends on your role:<br/>
<ol>
  <li>
    Doctor: if you are a doctor, you'll have a list of the patients from your hospital. You can click on them in order to see or create follow-ups for them.<br/>
    You can as well view, create, update and delete parameters and templates for your hospital.
  </li>
  <li>
    Patient: if you are a patient, you can access a list with all your follow-ups. You can visualize them if you click on them.<br/>
    Here you can select a parameter and create an 'answer' with the requested data.
  </li>
  <li>
    Both kind of users can edit their profiles, too.
  </li>
  <li>
    The app also has a chat. This is created by a doctor in order to comunicate with one patient.<br/>
    The doctor can create and enter each chat from its Patient Visualizer page. The patient will find another button, next to the one they use to watch all their follow-ups, where they can see and access to all their chats.
  </li>
</ol>

# Technologies comparison
In this part, I'm going to compare the three technologies that I use with other ones similar to them and / or with the same purpose.

### React
Probably, the most logical comparison here for *React* is *Angular*.<br/>
<br/>
*React*, as we already know, is a JavaScript library for user interfaces creation.<br/>
*Angular* is a JavaScript framework for web and mobile development based on *TypeScript*.<br/>
<br/>
Both are used for similar purposes. Both are perfectly valid for web and mobile development, although both have some "limitations" in this last field.<br/>
*React* needs *Cordova* to work on mobile phones, and also there is an aditional library called *React Native*.<br/>
*Angular* also has an aditional framework (*NativeScript*), and great part of the job is made by *Ionic*.<br/>
<br/>
Talking about complements, *Angular* easily wins that.<br/>
It is a complete framework, and it normally doesn't need any aditional libraries.<br/>
On the other hand, from *React* can be harder to comunicate with your API, yo most probably end up using *axios*. For the routing, you'll need something like *React Router*. And the list continues.<br/>
<br/>
All this process however, is easy to learn. No hard functions, no templates. It has what it has and you get on with it. It's "simple" (Big quotation marks there).<br/>
*Angular* has *a lot* of things. To learn everything about *Angular* is challenging. But, it is well organized. So, it is easy to look for some component or whatever while developing an app.<br/>
*React* is also beaten in this aspect, as you can put your files however you want and, if you are not careful, that can end up being quite of a mess.<br/>
<br/>
Having all in consideration, I prefer *React*.<br/>
I found it really fun to use and with a lot of potencial.

### Ruby on Rails
*Ruby on Rails* is complicated. It is *easy to use* but really *hard to learn*.<br/>
As we used it to create an API with an ORM, we could compare it with *Spring Boot*.<br/>
<br/>
There are some similarities between how these kind of tools operate when creating API.<br/>
You will always need to establish the *database* information, controllers, models...<br/>
<br/>
The main thing here is that *you* have to create those in *Spring Boot*.<br/>
But, with *Rails* you just have to *run a command* and it'll do the rest for you.<br/>
Create a model, create a controller, create the migration for the *database*... everything.<br/>
Speaking of which, *Rails* also creates the *database* for you. The Schema is in one of the *Ruby* files and you don't even have to export and import the *database* or do manual changes. You just *run a command*.<br/>
<br/>
If I had to think about negative points for *Rails*, I'll found a bunch of them. But, the most important being this a comparison are these:<br/>
<ol>
  <li>It's hard to learn</li>
  <li>It's slower</li>
</ol>

###
*Rails* is hard to learn. It gives you everything done, which is great. But, if you want to change or custom something, you just don' know how.<br/>
Also, *Ruby* (As we said before) is an interpreted language, and not a fast one.<br/>
*Spring* is based on *Java*, a compiled language. This means that it takes a few seconds to start but, when it does, it is super fast.<br/>
*Rails* just isn't.<br/>
Don't get me wrong, is fast. A human can nowadays barely tell the diference between these things. But it is inevitable that, being interpreted, is going to be a bit slower.

### PostgreSQL
*PostgreSQL* is mostly like *MySQL*, which I found really easy to use.<br/>
Though you won't need to use it very much if you are using *Rails* as I did.<br/>
<br/>
I could not tell any significant difference between *Postgre* and *MySQL*. They have some syntax differences, but they work almost equaly.<br/>
<br/>
I would recommend both if they case was given.

# Work Planning
For planning the project I used Trello:<br/>
[ - Trello](https://trello.com/b/fn7WvOIc/cardiologyproject)

# Conclusion and opinion
The project is not finished yet, but it's looking good.<br/>
<br/>
I'm looking forward to continue expanding this project and working and learning with these technologies.

# Repositories and links used
<ol>
  <li><a href="https://youtu.be/nTeuhbP7wdE">React tutorial</a></li>
  <li><a href="https://youtu.be/fmyvWz5TUWg">Rails tutorial</a></li>
  <li><a href="https://www.youtube.com/watch?v=bUYMWalNSEA&list=PLtcYUXSfqSIdbbaa_ruHh0p_Nntidd_FR&ab_channel=CodeTuts">More Rails and React tutorial</a></li>
  <li><a href="https://github.com/activerecord-hackery/ransack">Ransack GitHub</a></li>
  <li><a href="https://github.com/kaminari/kaminari">Kaminari GitHub</a></li>
  <li><a href="https://edgeguides.rubyonrails.org/active_storage_overview.html">Active Storage page</a></li>
  <li><a href="https://medium.com/swlh/upload-images-to-your-rails-api-from-react-the-easy-way-241bbe71ea85">Active Storage tutorial</a></li>
  <li><a href="https://github.com/waiting-for-dev/devise-jwt">Devise-jwt GitHub</a></li>
  <li><a href="https://medium.com/ruby-daily/a-devise-jwt-tutorial-for-authenticating-users-in-ruby-on-rails-ca214898318e">Devise-jwt tutorial</a></li>
  <li><a href="https://guides.rubyonrails.org/action_cable_overview.html">Action Cable</a></li>
  <li><a href="https://www.w3schools.com/">W3Schools</a></li>
  <li>Countless Stack Overflow pages</li>
</ol>
