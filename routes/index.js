const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const router = express.Router();
let Salt;
bcrypt.genSalt(10, (err, salt) => {
    if(err) {
        console.log(err);
    }
    else {
        Salt = salt;
    }
});

//User Model
const User = require('../models/User');

//Research Paper Model
const ResearchPaper = require('../models/Researchpaper');

//Conference Paper Model
const ConferencePaper = require('../models/Conferencepaper');

//Patent Model
const Patent = require('../models/Patent');

//Project Model
const Project = require('../models/Project');

//Login Page
router.get('/', (req, resp)=> {
    resp.render('login');
});

//Signup Page
router.get('/signup', (req, resp)=> {
    resp.render('signup');
});

//Forgot Password Page
router.get('/forgotpassword', (req, resp) => {
    resp.render('resetpassword');
});

//Home Page
router.get('/home', (req, resp) => {
    /* var sess = req.session;
    if(!sess.collegeid) {
        resp.redirect('/');
    }
    else {
        resp.render('home');
    } */
    resp.render('home');
});

//Journal Paper Details
router.get('/journal', (req, resp)=> {
    /* var sess = req.session;
    if(!sess.collegeid) {
        resp.redirect('/');
    }
    else {
        resp.render('journal');
    } */
    resp.render('journal');
});

//Conference Paper Details
router.get('/conference', (req, resp)=> {
    /* var sess = req.session;
    if(!sess.collegeid) {
        resp.redirect('/');
    }
    else {
        resp.render('conference');
    } */
    resp.render('conference');
});

//Patent Details
router.get('/patent', (req, resp) => {
    /* var sess = req.session;
    if(!sess.collegeid) {
        resp.redirect('/');
    }
    else {
        resp.render('patent');
    } */
    resp.render('patent');
});

//Project Details
router.get('/project', (req, resp) => {
    /* var sess = req.session;
    if(!sess.collegeid) {
        resp.redirect('/');
    }
    else {
        resp.render('project');
    } */
    resp.render('project');
});

//Login Handle
router.post('/login', (req, resp) => {
    const { collegeid, password } = req.body;

    User.findOne({collegeid:collegeid})
    .then(user => {
        if(!user) {
            console.log('No User found');
            resp.redirect("/?error=NoUserFound");
        }
        else {
            console.log("User found");
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) {
                  throw err
                } 
                else if (!isMatch) {
                    console.log("Incorrect Password");
                    resp.redirect("/?error=WrongPassword");
                }
                else {
                    console.log("Passwords Matched");
                    var sess = req.session;
                    sess.username = user.username;
                    sess.email = user.email;
                    sess.collegeid = user.collegeid;
                    resp.redirect("/home?success=Login");
                }
              });
        }
    })
    .catch(err => console.log(err));
});


//Logout Handle
router.get('/logout', (req, resp) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        resp.redirect('/?success=Logout');
    });
});

//Signup Handle
router.post('/createaccount', (req, resp) => {
    const { username, email, collegeid, password, confirmpassword } = req.body;
    const hashpass = "";
    User.find({collegeid: collegeid})
    .then(user => {
        console.log(user);
        if(user.collegeid) {
            console.log("User already exists");
            resp.redirect("/?error=UserExists");
        }
        else {
            bcrypt.hash(password, Salt, (err, hash) => {
                if(err) {
                    console.log(err);
                }
                else {
                    const newUser = new User({
                        username: username,
                        email: email,
                        collegeid: collegeid,
                        password: hash
                    });
                    newUser.save();
                    console.log(newUser);
                    resp.redirect("/?success=Signup");
                }
            });
        }
    })
    .catch(err => console.log(err));
})


//Reset Password Handle
router.post('/resetpassword', (req, resp) => {
    const collegeid = req.body;

    User.findOne({collegeid:collegeid})
    .then(user => {
        if(!user) {
            console.log('No User found');
            resp.send("No User Found");
        }
        else {
            console.log("User found");
            resp.send("An email with password reset link has been sent to your registered email id.");
        }
    })
    .catch(err => console.log(err));
});

//Research Details form handle
router.post('/researchdetails', (req, resp) => {
    const { papertitle, author, department, journalname, status, publicationyear, publishedwith, issn } = req.body;
    console.log(req.body);

    var authors = author.toString();
    var departments = department.toString();
    console.log(authors);

    ResearchPaper.findOne({title:papertitle})
    .then(researchpaper => {
        if(researchpaper) {
            console.log("Research Paper Already Exists");
            resp.redirect("/journal?error=JournalPaperExists");
        }
        else {
            const newResearchPaper = new ResearchPaper({
                title: papertitle,
                author: authors,
                department: departments,
                journalname: journalname,
                status: status,
                publicationyear: publicationyear,
                publishedwith: publishedwith,
                issn: issn
            });
            newResearchPaper.save();
            console.log(newResearchPaper);
            resp.redirect("/journal?success=JournalPaperAdded");
        }
    })
    .catch(err => console.log(err));
});


//Conference Details form handle
router.post('/conferencedetails', (req, resp) => {
    const { teachername, booktitle, papertitle, conferencetitle, conferencename, level, publicationyear, issnnumber, affiliatinginstitute, publishername } = req.body;

    ConferencePaper.findOne({title:papertitle})
    .then(conferencepaper => {
        if(conferencepaper) {
            console.log("Conference Paper Already Exists");
            resp.redirect("/conference?error=ConferencePaperExists");
        }
        else {
            const newConferencePaper = new ConferencePaper({
                facultyname: teachername,
                booktitle: booktitle,
                papertitle: papertitle,
                conferencetitle: conferencetitle,
                conferencename: conferencename,
                level: level,
                publicationyear: publicationyear,
                issnisbn: issnnumber,
                affiliatinginstitute: affiliatinginstitute,
                publishername: publishername
            });
            newConferencePaper.save();
            console.log(newConferencePaper);
            resp.redirect("/conference?success=ConferencePaperAdded");
        }
    })
    .catch(err => console.log(err));
});

//Patent Details Form Handle
router.post('/patentdetails', (req, resp) => {
    const { patenttitle, teamleader, number_inventor, inventor, department, status, filedon, patentnumber, patentyear } = req.body;

    var inventors = inventor.toString();

    Patent.findOne({patenttitle: patenttitle})
    .then(patent => {
        if(patent) {
            console.log('Patent already exists');
            resp.redirect('/patent?error=PatentExists');
        }
        else {
            const newPatent = new Patent({
                patenttitle: patenttitle,
                teamleader: teamleader,
                number_inventor: number_inventor,
                inventor: inventors,
                department: department,
                status: status,
                filedon: filedon,
                patentnumber: patentnumber,
                patentyear: patentyear
            });
            newPatent.save();
            console.log(newPatent);
            resp.redirect('/patent?success=PatentAdded');
        }
    })
    .catch(err => console.log(err));
});

//Project Details Form Handle
router.post('/projectdetails', (req, resp) => {
    const { projecttitle, principalinvestigator, fundingagency, department, projecttype, status, awardyear, fundreceived, durationyear, durationmonth } = req.body;
    var x, y;
    if(!durationyear) {
        x = "";
    }
    else {
        x = durationyear + " year";
    }
    if(!durationmonth) {
        y = "";
    }
    else {
        y = durationmonth + " month";
    }

    Project.findOne({projecttitle: projecttitle})
    .then(project => {
        if(project) {
            console.log('Project already exists');
            resp.redirect('/project?error=ProjectExists');
        }
        else {
            const newProject = new Project({
                projecttitle: projecttitle,
                principalinvestigator: principalinvestigator,
                fundingagency: fundingagency,
                department: department,
                projecttype: projecttype,
                status: status,
                awardyear: awardyear,
                fundreceived: fundreceived + " Lakh",
                duration: x + " " + y
            });
            newProject.save();
            console.log(newProject);
            resp.redirect('/project?success=ProjectAdded');
        }
    })
    .catch(err => console.log(err));
});


module.exports = router;