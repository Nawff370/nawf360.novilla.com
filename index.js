
  
  function signInPage() {
    window.location.href = "./navs/signin.html"
  }

  function openNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "inline";
  }
  
  function closeNavForEditingProfile() {
    document.getElementById("myNavForEditingProfile").style.display = "none";
  }

  document.querySelector(".homePageView").style.display = "block"
  document.querySelector(".postPageView").style.display = "none"
  document.querySelector(".chatPageView").style.display = "none"
  document.querySelector(".loginToUse").style.display = "none"
  
  // Active Selection
  var element = document.getElementById('homePageId')
  element.classList.add('active')
  var element = document.getElementById('postPageId')
  element.classList.remove('active')
  var element = document.getElementById('chatPageId')
  element.classList.remove('active')

  // Configuration
  var logined = ""

  // Account info
  var accountUid = ""
  var permforautoplay = ""
  var ipAddressLocation = ""
  var theme = ""
  var ipAddressSecretKey = ""
  var avatarUrl = ""
  var accUsername = ""
  var doCheck = 1


  function copyUid() {
    navigator.clipboard.writeText(accountUid)
  }


  const firebaseConfig = {

    apiKey: "AIzaSyBy80iYyXzTB_FodMshSHEK_jsphsMMb-M",
    authDomain: "novilia2023-aac9d.firebaseapp.com",
    databaseURL: "https://novilia2023-aac9d-default-rtdb.firebaseio.com",
    projectId: "novilia2023-aac9d",
    storageBucket: "novilia2023-aac9d.appspot.com",
    messagingSenderId: "1024302453931",
    appId: "1:1024302453931:web:5bbda5a7d151c42b8a13ee"
  
  }
  
  firebase.initializeApp(firebaseConfig)

  const auth = firebase.auth()

  auth.signInWithEmailAndPassword('nawfunnygamer@gmail.com', 'nawfisfunny123@').catch(function(error) {
    console.error('Sign-in error:', error)
  })

  document.querySelector(".topnav a.split").style.display = "none"
  document.querySelector(".accountInfo").style.display = "none"

 
    document.querySelector(".goingThrough1").style.display = "inline"

    document.getElementById("waitingScreen").style.display = "block"


  var database = firebase.database()

  window.onload = function() {

      checkSavedData()
      profileEditor()
      chatPageLive()

      setInterval(function() {
        intervalCode = profileEditor()
      }, 100)

      setInterval(function() {
        chatPageLive()
      }, 100)

 

  }



  function checkSavedData() {

    fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {

      var formattedIP = data.ip
      ipAddressLocation = data.ip
      const replacement = "3202"
      const ipAddress = formattedIP.split('.').join(replacement);

        var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
        ipAddressRef.once('value', function(snapshot) {
          if (snapshot.exists()) {
              var userData = snapshot.val()
              var userEmail = userData.email
              var userName = userData.name
              var userPassword = userData.password
              var userProfile = userData.profile
              var userDOC = userData.doc
              var userUid = userData.uid
              var userProfile = userData.profile
              var userTheme = userData.theme

              document.querySelector(".topnav a.split").style.display = "none"
              document.querySelector(".accountInfo").style.display = "inline"

              document.querySelector(".accName").textContent = userName
              document.querySelector(".accEmail").textContent = userEmail
              document.querySelector(".accountInfo").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".accProfile").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".profilePicture").style.backgroundImage = `url(${userProfile})`
              document.querySelector(".prfcontainer div").style.backgroundImage = `url(${userProfile})`
             
              accountUid = userUid
              document.querySelector(".inputsPE1").placeholder = userName + " (current nametag)"
              document.getElementById("waitingScreen").style.display = "none" 
              document.getElementById("emailAddressAD").textContent = userEmail
              document.getElementById("usernameAD").textContent = userName

              var dateOfCreation = userDOC.replace(/NN/g, '\/').replace(/CC/g, ':')
              document.getElementById("dateCreatedAD").textContent = dateOfCreation
              document.getElementById("secretKeyAD").textContent = userUid

              avatarUrl = userProfile
              document.getElementById("usernameDisplay").textContent = userName

              accUsername = userData.name
              logined = "yes"
              theme = userTheme
              ipAddressSecretKey = ipAddress.split('.').join(replacement)

              dmAddFromDb()


          } else {

              document.querySelector(".topnav a.split").style.display = "inline"
              document.querySelector(".accountInfo").style.display = "none"
              document.getElementById("waitingScreen").style.display = "none"
              logined = "no"

          }
        })

      })
     .catch(error => {
        console.error(error)
      })

  }


   function toggleDropdown() {
    var dropdown = document.getElementById("AccountInfoDropdown")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none"
    } else {
        dropdown.style.display = "block"
        document.querySelector(".overlayAccDetails").style.display = "none"
    }
   }

  // Close the dropdown if the user clicks outside of it
   window.onclick = function(event) {
      if (!event.target.matches('.accountInfo') && !event.target.matches('.AccountInfoDropdown-content')) {
          var dropdown = document.getElementById("AccountInfoDropdown")
          if (dropdown.style.display === "block") {
              dropdown.style.display = "none"
          }
      }
   }


  function profileEditor() {

    fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {

      var formattedIP = data.ip
      const replacement = "3202"
      const ipAddress = formattedIP.split('.').join(replacement)
      var dontCheck = 0

      var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
         ipAddressRef.once('value', function(snapshot) {
          if (snapshot.exists()) {
              var userData = snapshot.val()
              var userEmail = userData.email
              var userName = userData.name
              var userPassword = userData.password
              var userProfile = userData.profile
              var userDOC = userData.doc
              var userUid = userData.uid
              var userProfile = userData.profile
              var userTheme = userData.theme

              var nametag = document.getElementById('name').value
              var oldpass = document.getElementById('oldpassword').value
              var newpass = document.getElementById('newpassword').value

              var usersRef = database.ref('users/' + nametag)
              usersRef.once('value', function(snap2) {

                const fileInput = document.getElementById('profileImage')

                fileInput.addEventListener('click', () => {

                  const filepick = document.getElementById('profilePicker')

                  filepick.type = 'file'
                  filepick.click()

                  filepick.onchange = e => { 

                    var file = e.target.files[0]

                    if (file) {

                      if (file.type=='image/jpeg' || file.type=='image/jpg' || file.type=='image/jpg' || file.type=='image/svg') {

                          var reader = new FileReader()
                          reader.readAsDataURL(file)

                          reader.onload = readerEvent => {
                          var content = readerEvent.target.result;    
                          document.getElementById("waitingScreen").style.display = "block"              

                          var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
                          ipAddressRef.once('value', function(snapshot) {
                          if (snapshot.exists()) {
                          var userData = snapshot.val()
                          var userEmail = userData.email
                          var userName = userData.name
                          var userPassword = userData.password
                          var userProfile = userData.profile
                          var userDOC = userData.doc
                          var userUid = userData.uid
                          var userProfile = userData.profile
                          var userTheme = userData.theme

                          ipAddressRef.update({
                           profile: content
                          })

                           var realDatabase = database.ref('users/' + userName)
                           realDatabase.once('value', function(snapshot) {
                            if (snapshot.exists()) {
                            var userData = snapshot.val()
                            var userEmail = userData.email
                            var userName = userData.name
                            var userPassword = userData.password
                            var userProfile = userData.profile
                            var userDOC = userData.doc
                            var userUid = userData.uid
                            var userProfile = userData.profile
                            var userTheme = userData.theme

                            realDatabase.update({
                             profile: content
                            })

                            document.getElementById("waitingScreen").style.display = "none"

                            document.querySelector(".accountInfo").style.backgroundImage = `url(${content})`
                            document.querySelector(".accProfile").style.backgroundImage = `url(${content})`
                            document.querySelector(".profilePicture").style.backgroundImage = `url(${content})`
                            document.querySelector(".prfcontainer div").style.backgroundImage = `url(${content})`


                           } else {}
                          })

                         } else {}
                        })
                       }

                      } else {


                      }

                    }
                 
                 }

               })
            
          
              
                 if (nametag=="") {

                  document.querySelector(".alert3").style.display = "none"
                  document.querySelector(".checkmark1").style.color = "rgb(255, 0, 0)"

                 } else if (nametag==userName) {

                   document.querySelector(".alert3").style.display = "none"
                   document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"
                   var userCheck = 1

                 } else if (snap2.exists()) {

                   document.querySelector(".alert3").style.display = "block"
                   document.querySelector(".checkmark1").style.color = "rgb(255, 0, 0)"
                   var userCheck = 0

                 } else if (dontCheck==1) {

                  document.querySelector(".alert3").style.display = "none"
                  document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"

                 } else if (!snap2.exists()) {

                  document.querySelector(".alert3").style.display = "none"
                  document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"
                  var userCheck = 1  

                }

                 if (userPassword==oldpass) {

                  document.querySelector(".alert1").style.display = "none"
                  document.querySelector(".checkmark2").style.color = "rgb(14, 240, 6)"
                  var passCheck = 1

                 } else if (oldpass=='') {

                  document.querySelector(".alert1").style.display = "none"
                  document.querySelector(".checkmark2").style.color = "rgb(255, 0, 0)"

                 } else if (!oldpass=='') {

                  document.querySelector(".alert1").style.display = "block"
                  document.querySelector(".checkmark2").style.color = "rgb(255, 0, 0)"
                  var passCheck = 0

                 } else if (dontCheck==1) {

                  document.querySelector(".alert1").style.display = "none"
                  document.querySelector(".checkmark2").style.color = "rgb(14, 240, 6)"

                 }

                 if (newpass=="") {

                  document.querySelector(".alert2").style.display = "none"
                  document.querySelector(".checkmark3").style.color = "rgb(255, 0, 0)"
                  var newpassCheck = 0
                 } else if (dontCheck==1) {

                  document.querySelector(".alert3").style.display = "none"
                  document.querySelector(".checkmark1").style.color = "rgb(14, 240, 6)"

                 } else if (!newpass=="") {

                  if (newpass.length < 8) {

                    document.querySelector(".alert2").style.display = "block"
                    document.querySelector(".checkmark3").style.color = "rgb(255, 0, 0)"
                    var newpassCheck = 0

                   }  else {

                    document.querySelector(".alert2").style.display = "none"
                    document.querySelector(".checkmark3").style.color = "rgb(14, 240, 6)"
                    var newpassCheck = 1

                   }

                 }

                 if (userCheck + passCheck + newpassCheck == 3) {

                  document.querySelector(".submitButtonDecoy").style.display = "none"
                  document.querySelector(".submitButton").style.display = "block"

                 } else {

                  document.querySelector(".submitButton").style.display = "none"
                  document.querySelector(".submitButtonDecoy").style.display = "inline-block"

                 }

                 document.getElementById('profileEditForm').addEventListener('submit', submitChanges);

                 function submitChanges(e) {
                  e.preventDefault()
                  if (userCheck==1, passCheck==1, newpassCheck==1) {
                    dontCheck=1
                    doCheck = 0

                    var ipAddressRef = database.ref('savedLocationData/' + ipAddress)
                      ipAddressRef.once('value', function(snapshot) {
                       if (snapshot.exists()) {
                       var userData = snapshot.val()
                       var userEmail = userData.email
                       var userNameIp = userData.name
                       var userPassword = userData.password
                       var userProfile = userData.profile
                       var userDOC = userData.doc
                       var userUid = userData.uid
                       var userProfile = userData.profile
                       var userTheme = userData.theme


                       var realDatabase = database.ref('users/' + userNameIp)
                       realDatabase.once('value', async function(snapshot) {
                        if (snapshot.exists()) {
                        var userData = snapshot.val()
                        var userEmail = userData.email
                        var userName = userData.name
                        var userPassword = userData.password
                        var userProfile = userData.profile
                        var userDOC = userData.doc
                        var userUid = userData.uid
                        var userProfile = userData.profile
                        var userTheme = userData.theme
                        
                         if (userName==nametag) {

                          var newForm = firebase.database().ref('users/' + nametag)

                          async function generateUID(email, password) {
                           const encoder = new TextEncoder();
                           const data = encoder.encode(email + password);
                           
                           const buffer = await crypto.subtle.digest('SHA-256', data);
                           
                           const byteArray = Array.from(new Uint8Array(buffer));
                           const hexString = byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                           
                           return hexString
                         }

                         await generateUID(userEmail, newpass).then((h) => {

                          newForm.set({
                            name: nametag,
                            email: userEmail,
                            password: newpass,
                            theme: userTheme,
                            doc: userDOC,
                            uid: h,
                            profile: userProfile
                          })

                          ipAddressRef.update({
                            name: nametag,
                            password: newpass,
                            uid: h
                           }).then(()=>{

                            window.location.href = "./index.html"
                          })
                           
                         })

                           realDatabase.remove()

                         } else {

                           var newForm = firebase.database().ref('users/' + nametag)

                           async function generateUID(email, password) {
                            const encoder = new TextEncoder();
                            const data = encoder.encode(email + password);
                            
                            const buffer = await crypto.subtle.digest('SHA-256', data);
                            
                            const byteArray = Array.from(new Uint8Array(buffer));
                            const hexString = byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
                            
                            return hexString
                          }

                          await generateUID(userEmail, newpass).then((h) => {

                            newForm.set({
                              name: nametag,
                              email: userEmail,
                              password: newpass,
                              theme: userTheme,
                              doc: userDOC,
                              uid: h,
                              profile: userProfile
                            })

                            ipAddressRef.update({
                              name: nametag,
                              password: newpass,
                              uid: h
                             }).then(()=>{
                              window.location.href = "./index.html"
                            })
                            
                          })

                           realDatabase.remove()

                         }
                       } else {}
                      })                  

                      } else {}
                     })

                  }
                 }



              })

          } else {
            
          }
        })

      })
  }




  function closeNavForFullAccDetails() {

    document.querySelector(".overlayAccDetails").style.display = "none"

  }

  function openNavForFullAccDetails() {

    document.querySelector(".overlayAccDetails").style.display = "block"
    
  }
  

  function wallpaperSelection() {

    // id 1
    var popularAnime = [
       "https://4kwallpapers.com/images/walls/thumbs_3t/12504.png", // 1 // Luffy gear 5
       "https://4kwallpapers.com/images/walls/thumbs_3t/12455.jpeg", // 2 // Black clover asta
       "https://wallpapercave.com/wp/wp6437579.jpg", // 3 // Demon Slayer sunrise
       "../image/itachi1.jpg", // 4 // Itachi with hat
       "../image/sasuke1.jpg", // 5 // Sasuke moonlight
       "../image/sasuke2.jpg", // 6 // Sasuke demon shidhori
       "../image/luffy1.jpg", // 7 // Luffy with strawhat
    ]

    // id 2
    var animeLanscapes = [
      "https://images6.alphacoders.com/133/1330094.png", // 1 // Landscape blue sky
    ]

    // id 3
    var animeFantasy = [
      "https://images4.alphacoders.com/133/1332018.png", // 1 // Anime girl sunset
      "https://images3.alphacoders.com/133/1331008.png", // 2 // Anime girl bedroom
      "https://wallpapercave.com/wp/wp9005946.jpg", // 3 // Anime girl daylight
    ]

    var wallpaper = ""
    if (theme=="1") {
      var randomIndex = Math.floor(Math.random() * popularAnime.length)
      wallpaper = popularAnime[randomIndex]
    } else if (theme=="2") {
      var randomIndex = Math.floor(Math.random() * animeLanscapes.length)
      wallpaper = animeLanscapes[randomIndex]
    } else if (theme=="3") {
      var randomIndex = Math.floor(Math.random() * animeFantasy.length)
      wallpaper = animeFantasy[randomIndex]
    }
    if (!wallpaper=="") {
      document.querySelector("html").style.backgroundImage = `url(${wallpaper})`
    }
  }

  wallpaperSelection()

  function homeButtonClick() {
    // Display section
    document.querySelector(".homePageView").style.display = "block"
    document.querySelector(".postPageView").style.display = "none"
    document.querySelector(".chatPageView").style.display = "none"

    document.querySelector(".loginToUse").style.display = "none"
    
    // Active Selection
    var element = document.getElementById('homePageId')
    element.classList.add('active')
    var element = document.getElementById('postPageId')
    element.classList.remove('active')
    var element = document.getElementById('chatPageId')
    element.classList.remove('active')
  }

  function postButtonClick() {
  
    // Active Selection
    var element = document.getElementById('homePageId')
    element.classList.remove('active')
    var element = document.getElementById('postPageId')
    element.classList.add('active')
    var element = document.getElementById('chatPageId')
    element.classList.remove('active')

    document.querySelector(".homePageView").style.display = "none"
    document.querySelector(".chatPageView").style.display = "none"


    if (logined == "yes") {
      document.querySelector(".postPageView").style.display = "block"
      document.querySelector(".loginToUse").style.display = "none"
    } else if (logined ==  "no") {
      document.querySelector(".postPageView").style.display = "none"
      document.querySelector(".loginToUse").style.display = "block"

    }
  }

  function chatButtonClick() {

    // Active Selection
    var element = document.getElementById('homePageId')
    element.classList.remove('active')
    var element = document.getElementById('postPageId')
    element.classList.remove('active')
    var element = document.getElementById('chatPageId')
    element.classList.add('active')

    document.querySelector(".homePageView").style.display = "none"
    document.querySelector(".postPageView").style.display = "none"
    

    if (logined == "yes") {
      document.querySelector(".chatPageView").style.display = "block"
      document.querySelector(".loginToUse").style.display = "none"
    } else if (logined ==  "no") {
      document.querySelector(".chatPageView").style.display = "none"
      document.querySelector(".loginToUse").style.display = "block"
    }
  }


var postsRef = database.ref('posts')
var postInput = document.getElementById('post-input')
var postsContainer = document.getElementById('posts-container')



function addPost() {
  const button = document.querySelector(".post-form button")
  
  button.classList.add("animate")
  setTimeout(() => {
    button.classList.remove("animate")
  }, 200);

   const postText = postInput.value;
   if (postText) {
    const newPostRef = postsRef.push()
    newPostRef.set({
       text: postText,
       timestamp: new Date().getTime(),
       avatar: avatarUrl,
       username: accUsername
    });
     postInput.value = ''
   }
}

postInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    addPost()
  }
})


postsRef.on('child_added', (snapshot) => {
  const post = snapshot.val()

var currentDate = Date.now()
var targetDate = new Date(post.timestamp)
var timeDifference = currentDate - targetDate
var daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
var dateAndTime

if (daysAgo === 0) {
    var hourDifference = Math.floor(timeDifference / (1000 * 60 * 60))
    var minutesDifference = Math.floor(timeDifference / (1000 * 60))

    if (hourDifference < 1) {
        if (minutesDifference > 1) {
          dateAndTime = minutesDifference + " min ago"
        } else {
          dateAndTime = "now"
        }
    } else {
        dateAndTime = hourDifference + " hours ago"
    }
  } else if (daysAgo === 1) {
    dateAndTime = "yesterday " + targetDate.toLocaleTimeString()
  } else if (daysAgo >= 2 && daysAgo < 14) {
    dateAndTime = daysAgo + " days ago"
  } else if (daysAgo >= 14 && daysAgo < 21) {
    dateAndTime = "2 weeks ago"
  } else {
    dateAndTime = "very long time ago"
  }


  const postElement = createPostElement(post.text, dateAndTime, post.avatar, post.username)
   postsContainer.prepend(postElement)
  }) 

  function createPostElement(text, timestamp, avatar, username) {
   const postElement = document.createElement('div');
   postElement.classList.add('containerForSinglePost'); // Use 'classList.add' to add a class.

   postElement.innerHTML = `
   <div class="postPT">
    <header>
    <div class="avatar" style="background-image: url(${avatar});"></div>
    <h5 class="username">${username}</h5>
    </header>
    <p class="post-text">${text}</p>
   </div>
   <section>
     <h5 class="timestamp">${timestamp}</h5>
     </section>
   `

   return postElement;
   }



    function viewDmCreatingPopup() {
      document.querySelector(".createDMpopup").style.display = "block"
    }

    function closeDmCreatingPopup() {
      document.querySelector(".createDMpopup").style.display = "none"
    }

    function chatPageLive() {
      var name = document.getElementById("nameFordm").value

      if (name !== "") {
        if (name === accUsername) {
          document.querySelector(".alert6").style.display = "block"
        } else {
          document.querySelector(".alert6").style.display = "none"
          var userRef = database.ref('users/' + name);
    
          userRef.once('value', function(snapshot) {
            if (snapshot.exists()) {
              document.querySelector(".alert4").style.display = "none"
            } else {
              document.querySelector(".alert4").style.display = "block"
            }
    
            var userChatRef = database.ref('users/' + accUsername + "/chatData/" + name)
            userChatRef.once('value', function(snap) {
              if (snap.exists()) {
                document.querySelector(".alert5").style.display = "block"
              } else {
                document.querySelector(".alert5").style.display = "none"
              }

            })
          })
        }
      } else {
        document.querySelector(".alert4").style.display = "none"
        document.querySelector(".alert5").style.display = "none"
        document.querySelector(".alert6").style.display = "none"
      }

      var userChatRef = firebase.database().ref('usersChatSettings/' + accUsername + "ChatSettings")
      userChatRef.once('value', function(snap) {
        if (snap.exists()) {
         var userData = snap.val()
         var set = userData.set
           if (set=="yes") {
             document.querySelector(".dmsContainer").style.display = "block"
           } else if (set=="no") {
             document.querySelector(".dmsContainer").style.display = "none"
           }
        } else {
          document.querySelector(".dmsContainer").style.display = "none"
        }
      })
     
    }

    function createDm() {
      var name = document.getElementById("nameFordm").value;
      var database = firebase.database()
    
      if (name !== "") {
        if (name === accUsername) {
          document.querySelector(".alert6").style.display = "block"
        } else {
          document.querySelector(".alert6").style.display = "none"
          var userRef = database.ref('users/' + name);
    
          userRef.once('value', function(snapshot) {
            if (snapshot.exists()) {
              document.querySelector(".alert4").style.display = "none"
              var accExists = "1"
            } else {
              document.querySelector(".alert4").style.display = "block"
              var accExists = "0"
            }
    
            var userChatRef = database.ref('users/' + accUsername + "/chatData/" + name)
            userChatRef.once('value', function(snap) {
              if (snap.exists()) {
                document.querySelector(".alert5").style.display = "block"
                var accExistsInChat = "1"
              } else {
                document.querySelector(".alert5").style.display = "none"
                var accExistsInChat = "0"
              }

              if (accExists === "1" && accExistsInChat === "0") {

                var userRef = database.ref('users/' + name)
                userRef.once('value', function(snap) {
                  var userData = snap.val()
                  var userName = userData.name
                  var userProfile = userData.profile

                  // My chat for the other use
                  var newChat1 = database.ref('users/' + accUsername + "/chatData/" + userName)

                  newChat1.set({
                    name: userName,
                    profile: userProfile
                  })

                  var newChat1 = database.ref('usersChatSettings/' + accUsername + "ChatSettings")

                  newChat1.set({
                    set: "yes"
                  })
                  

                  // Their chat for me
                  var newChat2 = database.ref('users/' + userName + "/chatData/" + accUsername)

                  newChat2.set({
                    name: accUsername,
                    profile: avatarUrl
                  })

                  var newChat1 = database.ref('usersChatSettings/' + userName + "ChatSettings")

                  newChat1.set({
                    set: "yes"
                  })

                  
                })
    
              }
            })
          })
        }
      } else {
        document.querySelector(".alert4").style.display = "none"
        document.querySelector(".alert5").style.display = "none"
        document.querySelector(".alert6").style.display = "none"
      }
    }
    
  function dmAddFromDb() {
    const dmsContainer = document.getElementById('dmcontainer');
    const dmsRef = database.ref(`users/${accUsername}/chatData`);
    
    // Listen for child added events
    dmsRef.on('child_added', (snapshot) => {
      if (snapshot.exists()) {
       const post = snapshot.val();
       const dmElement = createDmElement(post.profile, post.name);
       dmsContainer.prepend(dmElement);
      } else {
      }
    });
    
    // Function to create a DM element
    function createDmElement(avatar, username) {
      const dmElement = document.createElement('div');
      dmElement.classList.add('dmListContainer');
    
      dmElement.innerHTML = `
      <div class="dmList">
        <div class="dmAvatar" style="background-image: url(${avatar});"></div>
        <p>${username}</p>
      </div>
      `;
    
      return dmElement;
    }
  }
     

  