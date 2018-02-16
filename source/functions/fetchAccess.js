const Function = require("../structures/Function");
const Constants = require("../utility/Constants");

class New extends Function {
    constructor(client, name) {
        super(client, name);
    }

    async execute(guild) {
        const owner = guild.owner ? guild.owner.user : await guild.members.fetch(guild.ownerID).user;

        const permissionLevel = this.client.handlers.permissions.fetch(guild, owner);

        if (permissionLevel.level > 5) return Constants.Access.Titles.STAFF;

        if (this.client.config.partners[owner.id]) return Constants.Access.Titles.PARTNER;

        if (this.client.caches.donors.has(owner.id) && this.client.caches.donors.get(owner.id).amount >= 5) return Constants.Access.Titles.DONOR;

        return Constants.Access.Titles.DEFAULT;
    }
}

module.exports = New;