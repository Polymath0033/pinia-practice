import { defineStore, acceptHMRUpdate } from "pinia";

export const userAuthStore = defineStore("userAuthStore", {
    state: () => {
        return {
            username: "danielkelly_io",
        };
    },
    actions: {
        visitTwitterProfile() {
            window.open(`https://twitter.com/${this.username}`, "_blank");
        },
    },
});
if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userAuthStore,
        import.meta.hot));
}