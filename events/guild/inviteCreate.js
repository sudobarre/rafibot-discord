module.exports = (client, Discord, invite) => {
     const creator = invite.inviterId;
     console.log(creator);
     const dateOfInv = invite.createdAt;
     console.log(dateOfInv);
     const generalChannel = client.channels.cache.get('915210119904657431');
     generalChannel.send(`${creator} created an invite at ${dateOfInv}.`);
 };
 