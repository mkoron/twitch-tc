
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dummy_user_12789"];
var no_avatar_image = 'https://dummyimage.com/100x100/fff/71738f.png&text=No+user+image';


$(function(){
    let rowNumber = 1;
    let userName, avatar, game, url, userRow;

    for(let i = 0; i < users.length; i++) {
        $.ajax({
            type: 'GET',
            url: `https://wind-bow.gomix.me/twitch-api/channels/${users[i]}`,
            dataType: 'jsonp',
            success: function (data) {
                userName = data.display_name || users[i];
                avatar = data.logo || no_avatar_image;
                game = data.game;
                url = data.url
                
                if (data.error) {
                    userRow = `<tr class="bg-danger">
                    <th scope='row'>${rowNumber++}</th>
                    <td colspan='4'>${data.message}</td>
                   </tr>`
                }
                else {
                    userRow = `<tr>
                                <th scope='row'>${rowNumber++}</th>
                                <td class='avatar'><img src="${avatar}"></td>
                                <td class='username'><a href="${url}" target="blank">${userName}</a></td>
                                <td class='status'>**</td>
                                <td class='game'>${game}</td>
                            </tr>`
                    console.log(data.error);
                }

                $('#results').append(userRow);
            },
            error: function (err){
               console.log("Something went wrong...");
            }
        });
        $.ajax({
            type: 'GET',
            url: `https://wind-bow.gomix.me/twitch-api/streams/${users[i]}`,
            dataType: 'jsonp',
            success: function (data) {

                console.log(data);
            },
            error: function (err){
                console.log("Something went wrong...");
            }
        });
    }
})

