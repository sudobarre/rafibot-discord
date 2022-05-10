client.on('voiceStateUpdate', (oldState, newState) => {
    const newUserChannel = newState.channelID;
    const textChannel = client.channels.cache.get('852643030477307995');
// 852643030477307995 = ID of the text channel, I use, where the message will be posted
  
    if(newUserChannel === '759339336663040020') {
// 759339336663040020 = ID of the voice channel I want to lookup
      textChannel.send(`Hey <@&752168551103856700> ! ${newState.member} is waiting for help !`);
// <@&752168551103856700> = ID of the role I want to tag
    }

//Create a new file on the events folder called voice StateUpdate
