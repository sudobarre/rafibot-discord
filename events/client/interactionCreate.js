const User = require("../../schema/userSchema");


const oldSong1 = 'https://www.youtube.com/watch?v=kMzlN9-Db1A';
const oldSong2 = 'https://www.youtube.com/watch?v=F2EmooQ1Iag';
const oldSong3 = 'https://www.youtube.com/watch?v=hUwCSXMC-4s';
const taiwanese = 'https://www.youtube.com/watch?v=JJ_Otuu5-Oo';
const vie= 'https://www.youtube.com/watch?v=9foKesji-Os';
const jetplane = 'https://www.youtube.com/watch?v=rCmcgn793hs';
const eyeslofi = 'https://www.youtube.com/watch?v=xOgdaVoSuWg';
const buttercup = 'https://www.youtube.com/watch?v=PK8HQmHEvwM';
const makemecry = 'https://www.youtube.com/watch?v=Ra77qWfXv1c';
const wearyhead = 'https://www.youtube.com/watch?v=gQiFyZ2-6Js';
const habibi = 'https://www.youtube.com/watch?v=Ne0KYyGEBFc';
const beegees = 'https://www.youtube.com/watch?v=XpqqjU7u5Yc';
const bluemoon = 'https://www.youtube.com/watch?v=RfAHBVMguDQ';
const howls = 'https://www.youtube.com/watch?v=UwxatzcYf9Q';
const promiseworld = 'https://www.youtube.com/watch?v=yuhOUeZHEBo';
const thatslife ='https://www.youtube.com/watch?v=TnlPtaPxXfc';
const christmas = 'https://www.youtube.com/watch?v=9cORUL2P8H8&t=226s';
const sinatra2 = 'https://www.youtube.com/watch?v=YFham2Xu6nA';
const sinatra3 = 'https://www.youtube.com/watch?v=BXmEJL1mnuU';
const goodbyela ='https://www.youtube.com/watch?v=jHIpCBjgJ8s';

const chetBaker = 'https://www.youtube.com/watch?v=Ic-3mudz8TA';
const cag = 'https://www.youtube.com/watch?v=BpwDFKFkpOY';
const memoriesLover = 'https://www.youtube.com/watch?v=iJzJ7d5CK4A';
const moonBeautiful = 'https://www.youtube.com/watch?v=8AvUSCz_zj0';
const claire ='https://www.youtube.com/watch?v=oiJj9GQGKsg';
const lizzy = 'https://www.youtube.com/watch?v=lzeIxSQULe4';


const tron = 'https://www.youtube.com/watch?v=RjM8d0Csuk4';
const cagrhye = 'https://www.youtube.com/watch?v=npgiuricgv4';
const adoy = 'https://www.youtube.com/watch?v=3vrcoQTvAEw';
const longChill = 'https://www.youtube.com/watch?v=uR3aQOgzyDU';
const lamp = 'https://www.youtube.com/watch?v=-ILcH66zGcY&t=905s';
const lee1='https://www.youtube.com/watch?v=HIV3huSNmwo';
const oldieslofi = 'https://www.youtube.com/watch?v=BrnDlRmW5hs&t=1s';
const oldieslofi3 = 'https://www.youtube.com/watch?v=yN_5jNxM0CU';
const honne1 = 'https://www.youtube.com/watch?v=B1RMHumd1wg';
const honne2 = 'https://www.youtube.com/watch?v=0ozLw9HXVUQ';
const honne3 = 'https://www.youtube.com/watch?v=7TYmklycjk8';
const honne4 = 'https://www.youtube.com/watch?v=hXMbGBK6yVQ';
const honne5 = 'https://www.youtube.com/watch?v=crRTPOUWWr0';
const brunoM1= 'https://www.youtube.com/watch?v=ucRVDoFkcxc';
const brunoM2 = 'https://www.youtube.com/watch?v=1nml-_YE2OU';
const brunoM3 = 'https://www.youtube.com/watch?v=HwgzNYCSivk';
const brunoM4 = 'https://www.youtube.com/watch?v=sSvAFjpLaGA';
const charlieBurgh= 'https://www.youtube.com/watch?v=97S946ek2-0';
const macDemarco='https://www.youtube.com/watch?v=swrYqVvTNLQ';
const summerSalt = 'https://www.youtube.com/watch?v=EMqRGcOeRkw';

const interstellar = 'https://www.youtube.com/watch?v=cU0Wz1ez3J0';
const astronaut = 'https://www.youtube.com/watch?v=NRwoqT6JBRA';

const rina = 'https://www.youtube.com/watch?v=A2urtFRvOak';
const boringstories = 'https://www.youtube.com/watch?v=7p0B2MD11QI';
const johnLee ='https://www.youtube.com/watch?v=fiuA1hZrDtU&t=2902s';
const lpda = 'https://www.youtube.com/watch?v=6cOssODvLfk';
const sleepkorean = 'https://www.youtube.com/watch?v=VefjGt26aZA';
const jazzcafe = 'https://youtu.be/iIuuMNbSjDE';

const osrs = 'https://www.youtube.com/watch?v=uOhv43F-F6M&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=2&t=2364s';
const tes = 'https://www.youtube.com/watch?v=yQGtOrJ3j-I&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=4&t=1627s';
const relPokemon = 'https://www.youtube.com/watch?v=-BKfhq_TtcE&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=5&t=2248s';
const dpp = 'https://www.youtube.com/watch?v=9pnhfRN9x4Q&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=8&t=15s';
const hgss = 'https://www.youtube.com/watch?v=VToyayJ4u2k&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=10&t=152s';
const bw = 'https://www.youtube.com/watch?v=2T9YM2sDmMA&list=PL-NPTX2RY0yZasQnCif9f2l_vix-X-1KU&index=11&t=21s';
const undertale = 'https://www.youtube.com/watch?v=vV7A_bD8Kgo';

const mayerSob = 'https://www.youtube.com/watch?v=CAAO6-sLvHE';
const contiunuum = 'https://www.youtube.com/watch?v=d2bmuBV2XDI';
const prince = 'https://www.youtube.com/watch?v=tTwyVNnfjzU';
const bbking = 'https://www.youtube.com/watch?v=ydzGfZBdqvo';
const srv = 'https://www.youtube.com/watch?v=fAPo0EMfdLw';
const compBlue = 'https://www.youtube.com/watch?v=bt0XdyBgSnE';

const lofigirl2 = 'https://www.youtube.com/watch?v=n61ULEU7CO0&t=3s';
const lofigirl3 = 'https://www.youtube.com/watch?v=lTRiuFIWV54';
const lofigirl4 = 'https://www.youtube.com/watch?v=wAPCSnAhhC8';

const mayerChill = [[mayerSob], [contiunuum],[prince], [bbking], [johnLee], [srv], [compBlue]];
const aysanChill = [[goodbyela], [christmas], [sinatra2], [sinatra3], [thatslife], [howls], [promiseworld], [beegees], [habibi], [brunoM4], [honne1],[honne2], [honne3], [honne4], [honne5], [jetplane], [oldSong1], [oldSong2], [oldSong3], [vie], [taiwanese], [oldieslofi], [oldieslofi3], [eyeslofi], [buttercup], [bluemoon]];
const sad = [[lizzy], [charlieBurgh], [chetBaker], [cag], [memoriesLover], [moonBeautiful], [taiwanese], [claire], [lee1], [oldSong2]];
const chill = [[goodbyela], [christmas], [summerSalt], [macDemarco], [charlieBurgh],[promiseworld], [bluemoon], [brunoM1], [brunoM2], [brunoM3], [brunoM4],[honne1],[honne2], [honne3], [honne4], [honne5],[makemecry], [lamp], [tron], [longChill], [cagrhye], [adoy], [lee1], [rina], [oldieslofi], [oldieslofi3], [eyeslofi]];
const simaSleep = [[jazzcafe], [sleepkorean],[boringstories], [moonBeautiful], [johnLee], [lpda], [claire], [memoriesLover]];
const sleep = [[sleepkorean], [makemecry], [wearyhead], [cag], [moonBeautiful], [interstellar], [astronaut], [claire], [memoriesLover]];
const rafiStudy = [[astronaut], [osrs], [tes], [relPokemon], [dpp], [hgss], [bw], [undertale]];
const moStudy = [[lofigirl2], [lofigirl3], [lofigirl4]];













async function playSongs(songs, interaction, client, Discord){
  try {
    const commandPlay = client.commands.get("play");
    commandPlay
      .execute(client, interaction, "play", songs, Discord, 1)
      .then(
        () => {
          return commandPlay.execute(
            client, interaction, "skip", [], Discord);
        },
        () => {
          return console.log("Oopsie Woopsie, thewe was an ewwoww while queueing songs. So sowwy senpai!!! uwu");
        },
      );
      await interaction.deleteReply();
      return;
    //await interaction.deferReply();
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing play on interactionCreate.",
      ephemeral: true,
    });
  }
}


module.exports = (client, Discord, interaction) => {
  async function handleCommand() {
    if (interaction.isCommand()) {
      const slashcmd = client.slashcommands.get(interaction.commandName);
      if (!slashcmd) return;

      try {
        await interaction.deferReply();
        await slashcmd.run({
          client,
          interaction,
        });
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command.",
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()){
        let user;
        let idx;
        let id;
      switch (interaction.customId){
        case "delete-playlist": //interaction.values is an arr of 1 elem for the index to delete
          id = interaction.user.id;
          user = await User.findOne({userId:id});
          idx = parseInt(interaction.values[0]);
          const plists = user.playlists;
          //remove the song from the plist
          plists.splice(idx, 1);
          user.playlists = plists;
          user.save();
        break;
        case "choose-song": //interaction.values is an arr of 1 element consisting of [index, id]. Ugly af.
          id = parseInt(interaction.values[0].substring(2)); //id
          user = await User.findOne({userId:id});
          idx = parseInt(interaction.values[0]); //index
          const plist = user.playlists[idx];
          //check for visibility here
          if(!(id != interaction.user.id && !plist.visibility)){
            playSongs(plist.songs, interaction, client, Discord);
          } else {
            interaction.deleteReply();
          }
          break;
        default:
          break;
      }
      
      //playSongs(songs, interaction, client, Discord)
      
    }
  }
  handleCommand();
  return;
};
