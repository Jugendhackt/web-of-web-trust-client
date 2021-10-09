import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
    defaults: {
        weightA: 1,
        weightB: 1
    },
    migrations: [
        OptionsSync.migrations.removeUnused,
    ],
    logging: true,
});
