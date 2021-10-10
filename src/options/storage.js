import OptionsSync from 'webext-options-sync';

export default new OptionsSync({
    defaults: {
        serverUrl: "http://127.0.0.1:8000/",
        weightA: 1,
        weightB: 1
    },
    migrations: [
        OptionsSync.migrations.removeUnused,
    ],
    logging: true,
});
