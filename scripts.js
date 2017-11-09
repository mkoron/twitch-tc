
var users = ["thepetcollective", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","dummy_user_12789"];
var no_avatar_image = 'https://dummyimage.com/100x100/fff/71738f.png&text=No+user+image';


$(function(){

    let rowNumber = 1;

    for(let i = 0; i < users.length; i++) {
        let getStreams = $.ajax({
                type: 'GET',
                url: `https://wind-bow.gomix.me/twitch-api/streams/${users[i]}`,
                dataType: 'jsonp',
                success: function (data) {
                },
                error: function (err){
                    console.log("Something went wrong...");
                }
            });

        let getChannels = $.ajax({
                type: 'GET',
                url: `https://wind-bow.gomix.me/twitch-api/channels/${users[i]}`,
                dataType: 'jsonp',
                success: function (data) {
                },
                error: function (err){
                console.log("Something went wrong...");
                }
            });

            $.when(getStreams, getChannels).then(function(streamsData, channelsData){
         
                let userRow, statusColor;

                let streamingStatus = streamsData[0].stream;

                let userName = channelsData[0].display_name || users[i];
                let avatar = channelsData[0].logo || no_avatar_image;                
                let game = channelsData[0].game || '-';
                let url = channelsData[0].url

                statusColor = streamingStatus ? 'green' : 'red';

                if (channelsData[0].error) {
                    userRow = `<tr class="bg-danger">
                    <th scope='row' class='hidden-xm'>${rowNumber++}</th>
                    <td colspan='4'>${channelsData[0].message}</td>
                   </tr>`
                }

                else { 
                    userRow = `<tr>
                                <th scope='row' class='hidden-xm'>${rowNumber++}</th>
                                <td class='avatar hidden-xm'><img src="${avatar}"></td>
                                <td class='username'><a href="${url}" target="blank">${userName}</a></td>
                                <td class='status '><span class='${statusColor}'></span></td>
                                <td class='game'>${game}</td>
                            </tr>`
                }

                $('#results').append(userRow);   
            });
    }
})

