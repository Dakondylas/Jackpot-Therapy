// Title screen elements
let startButton = document.getElementById('startButton');
let titleText = document.getElementById('titleText');
// Profile screen elements
let createNewProfile = document.getElementById('createNewProfile');
let profileText = document.getElementById('profileText');
let selectButton = document.getElementById('selectButton');
let selectLeftButton = document.getElementById('selectLeftButton');
let selectRightButton = document.getElementById('selectRightButton');
// avatarSelectMid appears in main and profile screens
let avatarSelectMid = document.getElementById('avatarSelectMid');
let avatarSelectLeft = document.getElementById('avatarSelectLeft');
let avatarSelectRight = document.getElementById('avatarSelectRight');

// Main screen elements
let profileNameElement = document.getElementById('profileName');
let balanceElement = document.getElementById('balance');
let slotMachine = document.getElementById('slotMachine');

// Elements that appear in every screen
let music = document.getElementById('music');
let background = document.getElementById('background');
let clickSound = document.getElementById('clickSound');
let backOrQuitButton = document.getElementById('backOrQuitButton');

// variables
let profilePic = 1;
let profileName = "";
let currentScreen = "title";
// this is where all profiles will be stored, using key value pairs for each profile for the name, avatar, and balance
let profileMatrix = [{name: "Default", avatar: 1, balance: 1000}];
// for the profile selection screen, 0 is the create new profile option, 1+ are the saved profiles, 
// starts at -1 since no profile is selected
let selectedProfileTemp = 0;





// onload function to set music controls to true then false to get music to start playing

document.onload = function() {
    // The music doesnt start without this for some reason
    music.controls = true;
    music.controls = false;
}



startButton.onmousedown = function() {
    buttonClick(startButton, profileScreen);
};

selectButton.onmousedown = function() {
    buttonClick(selectButton, function() {
        if (currentScreen == "profile-name") {
            profileName = profileText.innerHTML;
            profileNameElement.innerHTML = profileName;
            mainScreen();
        } else if (currentScreen == "profile-character") {
            avatarSelectLeft.style.display = 'none';
            avatarSelectRight.style.display = 'none';
            selectLeftButton.style.display = 'none';
            selectRightButton.style.display = 'none';
            console.log("Character Selected: " + profilePic)
            profileText.innerHTML = "Enter Name";
            currentScreen = "profile-name";
            profileText.setAttribute('style', 'display: block;width: 600px;height: 20px;margin-left: 560px;margin-bottom: 100px;');
            profileText.focus();
            profileText.style.textBoxTrimming = 'none';
            profileText.contentEditable = 'true';
        } else if (currentScreen == "profile-select") {
            if (selectedProfileTemp == 0) {
                // create new profile
                profileScreen();
            } else if (selectedProfileTemp > 0) {
                // load selected profile
                let selectedProfile = profileMatrix[selectedProfileTemp -1];
                profileName = selectedProfile.name;
                profilePic = selectedProfile.avatar;
                let balance = selectedProfile.balance;
                profileNameElement.innerHTML = profileName;
                balanceElement.innerHTML = "Balance: $" + balance;
                avatarSelectMid.setAttribute('src', '../images/Avatars/' + profilePic + '.png');
                mainScreen();
            }
        }
    });
};

selectLeftButton.onmousedown = function() {
    buttonClick(selectLeftButton, function() {
        if (profilePic == 1) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/9.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/10.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/1.png');
            profilePic = 10;
        } else if (profilePic == 2) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/10.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/1.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/2.png');
            profilePic = 1;
        } else if (profilePic == 10) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/8.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/9.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/10.png');
            profilePic = 9;
        } else {
            let newPic = profilePic - 1;
            avatarSelectLeft.setAttribute('src', '../images/Avatars/' + (newPic - 1) + '.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/' + newPic + '.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/' + (newPic + 1) + '.png');
            profilePic = newPic;
        }
    });
};

selectRightButton.onmousedown = function() {
    buttonClick(selectRightButton, function() {
        if (profilePic == 9) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/9.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/10.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/1.png');
            profilePic = 10;
        } else if (profilePic == 10) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/10.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/1.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/2.png');
            profilePic = 1;
        } else if (profilePic == 1) {
            avatarSelectLeft.setAttribute('src', '../images/Avatars/1.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/2.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/3.png');
            profilePic = 2;
        } else {
            let newPic = profilePic + 1;
            avatarSelectLeft.setAttribute('src', '../images/Avatars/' + (newPic - 1) + '.png');
            avatarSelectMid.setAttribute('src', '../images/Avatars/' + newPic + '.png');
            avatarSelectRight.setAttribute('src', '../images/Avatars/' + (newPic + 1) + '.png');
            profilePic = newPic;
        }
    });
};


createNewProfile.onmousedown = function() {
    // I don't use the buttonClick function for profile select elements because they 
    // should not be assigned to the open and closed classes, those are for buttons only
    // profile classes are img elements
    clickSound.src = '../sounds/click.mp3';
    clickSound.currentTime = 0;
    clickSound.play();
    createNewProfile.onmouseup = function() {
        clickSound.src = '../sounds/unclick.mp3';
        clickSound.currentTime = 0;
        clickSound.play();
        createNewProfile.setAttribute('class', 'profileIconSelected');
        selectedProfileTemp = 0;
        selectButton.style.display = 'block';
    };
};

backOrQuitButton.onmousedown = function() {
    buttonClick(backOrQuitButton, function() {
        if (currentScreen == "title") {
            // quit game
            console.log("Quit Game");
            window.close();
        } else {
            backOrQuitButton.style.left = "7%";
            backOrQuitButton.innerHTML = "Quit";
            // go back to title screen
            console.log("Back to Title Screen");
            // reset all elements to title screen
            createNewProfile.style.display = 'none';
            profileText.style.display = 'none';
            selectLeftButton.style.display = 'none';
            selectRightButton.style.display = 'none';
            avatarSelectLeft.style.display = 'none';
            avatarSelectMid.style.display = 'none';
            avatarSelectRight.style.display = 'none';
            selectButton.style.display = 'none';
            profileNameElement.style.display = 'none';
            balanceElement.style.display = 'none';
            slotMachine.style.display = 'none';
            startButton.style.display = 'block';
            titleText.style.display = 'block';
            background.setAttribute('src', '../images/TitleScreen.jpg');
            currentScreen = "title";
        }
    });
}

// function for button clicking, does the clicking animation, plays the click sound, and when you 
// release the mouse it does the specified action. button parameter is the button element. action parameter 
// is the function to call on mouseup.
// Call this function in a mousedown event for a button. dont need a mouseup event since its handled here.
function buttonClick(button, action) {
    button.setAttribute('class', 'closed');
    clickSound.src = '../sounds/click.mp3';
    clickSound.currentTime = 0;
    clickSound.play();
    button.onmouseup = function() {
        button.setAttribute('class', 'open');
        clickSound.src = '../sounds/unclick.mp3';
        clickSound.currentTime = 0;
        clickSound.play();
        action();
    };
}
 
function profileScreen() {
    backOrQuitButton.innerHTML = "Back";
    console.log("Profile Screen Opened");
    selectButton.style.display = 'block';
    if (currentScreen == "title" || currentScreen == 'main') {
        // Remove objects from title screen and main screen and goes to the profile select screen
        profileText.innerHTML = "Select Profile";
        selectButton.style.display = 'none';
        startButton.style.display = 'none';
        titleText.style.display = 'none';
        createNewProfile.style.display = 'block';
        profileText.style.display = 'block';
        profileNameElement.style.display = 'none';
        balanceElement.style.display = 'none';
        slotMachine.style.display = 'none';
        currentScreen = "profile-select"

        // TODO: make a function that iterates through all of the profiles and either checks if they are in the 
        // profileIconSelected class or makes it so they are all not in that class

        // I want to implament that function here in the future so that it resets all the profile icons everytime you go to the 
        // profile select page
        // for now I have manually set the createNewProfile to be 
        // unselected when going to profile select screen
        createNewProfile.setAttribute('class', 'avatar2');
    } else if (currentScreen == "profile-select") {
        avatarSelectMid.setAttribute('class', 'avatar1')
        // removes objects from profile select screen and goes to avatar select screen
        createNewProfile.style.display = 'none';
        profileText.style.display = 'block';
        selectLeftButton.style.display = 'block';
        selectRightButton.style.display = 'block';
        avatarSelectLeft.style.display = 'block';
        avatarSelectMid.style.display = 'block';
        avatarSelectRight.style.display = 'block';
        profileText.innerHTML = "Select an Avatar";
        currentScreen = "profile-character";
    }

    

    // change background to profile screen
    background.setAttribute('src', '../images/ProfileScreen.jpg');

    
   
}


function mainScreen(){
    backOrQuitButton.innerHTML = "Save and Quit";
    backOrQuitButton.style.left = "12%";
    console.log("Main Screen Opened");
    if (currentScreen == "profile-name") {
        // Remove objects from profile screen
        profileText.style.display = 'none';
        selectButton.style.display = 'none';
        avatarSelectMid.setAttribute('class', 'avatar3')
        profileNameElement.style.display = 'block';
        balanceElement.style.display = 'block';
        slotMachine.style.display = 'block';
        currentScreen = "main";
    }
    // change background to main screen
    background.setAttribute('src', '../images/MainScreen.jpg');
}