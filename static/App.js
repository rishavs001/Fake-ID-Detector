var profile;
var userequalname;
var description;
var externalurl;
var private;
var posts;
var following;
var followers;

var chardivuser;
var chardivname;
var wordsname;



function Validity() {
    let flag = 0;
    if (document.getElementsByClassName('profilepicture')[0].checked || document.getElementsByClassName('profilepicture')[1].checked) {
    }
    else {
        flag = 1;
    }
    if (document.getElementById('username').value.length < 3) {
        flag = 1;
        document.getElementById('username').style.borderBottom = '2px solid #ce2828';
    }
    if (document.getElementById('fullname').value.length < 3) {
        flag = 1;
        document.getElementById('fullname').style.borderBottom = '2px solid #ce2828';
    }
    if (document.getElementsByClassName('exturl')[0].checked || document.getElementsByClassName('exturl')[1].checked) {
    }
    else {
        flag = 1;
    }
    if (document.getElementsByClassName('privt')[0].checked || document.getElementsByClassName('privt')[1].checked) {
    }
    else {
        flag = 1;
    }
    if (!document.getElementById('posts').value) {
        flag = 1;
        document.getElementById('posts').style.borderBottom = '2px solid #ce2828';
    }
    if (!document.getElementById('following').value) {
        flag = 1;
        document.getElementById('following').style.borderBottom = '2px solid #ce2828';
    }
    if (!document.getElementById('followers').value) {
        flag = 1;
        document.getElementById('followers').style.borderBottom = '2px solid #ce2828';
    }
    if (flag == 1) {
        return false;
    }
    return true;

}

document.getElementById("formfilled").addEventListener("click", function (e) {
    e.preventDefault();
    if (true) {
        if (document.getElementsByClassName('profilepicture')[0].checked) {
            profile = 1;
        }
        else {
            profile = 0;
        }
        if (document.getElementById('username').value == document.getElementById('fullname').value) {
            userequalname = 1;
        }
        else {
            userequalname = 0;
        }
        description = document.getElementById('description').value.trim().length;
        if (document.getElementsByClassName('exturl')[0].checked) {
            externalurl = 1;
        }
        else {
            externalurl = 0;
        }
        if (document.getElementsByClassName('privt')[0].checked) {
            private = 1;
        }
        else {
            private = 0;
        }

        posts = document.getElementById('posts').value;
        following = document.getElementById('following').value;
        followers = document.getElementById('followers').value;

        let S = document.getElementById('username').value;
        let count = 0;
        for (let i = 0; i < S.length; i++) {
            if ((S.charAt(i) >= 'A' && S.charAt(i) <= 'Z') || (S.charAt(i) >= 'a' && S.charAt(i) <= 'z')) {
                // do nothing
            } else {
                count++;
            }
        }
        chardivuser = count / S.length;

        let T = document.getElementById('fullname').value;
        let temp2 = "";
        for (let i = 0; i < T.length; i++) {
            if (temp2.includes(T[i]) === false) {
                temp2 += T[i]
            }
        }
        chardivname = temp2.length / T.length;

        const arr = T.split(' ');

        wordsname = arr.filter(word => word !== '').length;

        // console.log(profile);
        // console.log(userequalname);
        // console.log(description);
        // console.log(externalurl);
        // console.log(private);
        // console.log(posts);
        // console.log(following);
        // console.log(followers);
        // console.log(chardivuser);
        // console.log(chardivname);
        // console.log(wordsname);
        sendDataToPython(profile, userequalname, description, externalurl, private, posts, following, followers,
            chardivuser, chardivname, wordsname,);
    }
});

document.getElementById("nextclicked").addEventListener("click", function (e) {
    e.preventDefault();
    setTimeout(() => {
        document.getElementById('main').style.display = "none";
        document.getElementById('section').style.display = "flex";

    }, 500)
});

function sendDataToPython(value1, value2, value3, value4, value5, value6, value7, value8, value9, value10, value11) {
    // Create an object with the data to send
    var data = {
        profile: value1,
        userequalname: value2,
        description: value3,
        externalurl: value4,
        private: value5,
        posts: value6,
        following: value7,
        followers: value8,

        chardivuser: value9,
        chardivname: value10,
        wordsname: value11
        // Add more variables as needed
    };

    // Send the data to the Python server
    fetch('/endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            // Handle the response from the Python server
            console.log(result.result);
            if (result.result === "real") {

                document.getElementById('resultval').innerText = "Account is Real";
                document.getElementById('answer').style.color = "#3c763d";
                document.getElementById('answer').style.backgroundColor = "#dff0d8";
            }
            else {
                document.getElementById('resultval').innerText = "Account is Fake";
                document.getElementById('answer').style.color = "#a94442";
                document.getElementById('answer').style.backgroundColor = "#f2dede";
            }
            document.getElementById('answer').style.display = "block";
            document.getElementById('answer').style.animationName = "slide";
            document.getElementById("form").reset();
            setTimeout(() => {
                document.getElementById('answer').style.display = "none";
            }, 3000);

        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error:', error);
        });
}
