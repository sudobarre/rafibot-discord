module.exports = (client, Discord, oldState, newState) =>{
    console.log(newState);
    console.log(oldState);
    const newUserChannel = newState.channelID;
    console.log(newUserChannel);
    const textChannel = client.channels.cache.get('933423366822588487');
// 852643030477307995 = ID of the text channel, I use, where the message will be posted
  
    if(newUserChannel === '942831611991433258') {
// 759339336663040020 = ID of the voice channel I want to lookup
      textChannel.send(`Hey <@&228837379165650946> ! ${newState.member} is waiting for help !`);
// <@&752168551103856700> = ID of the role I want to tag
    }
};

