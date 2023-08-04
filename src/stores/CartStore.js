import { defineStore } from "pinia";
import { userAuthStore } from "./UserAuthStore.";
import { groupBy } from "lodash";
export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
            tot: 0,
        };
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty() {
            return this.count === 0;
        },
        grouped: (state) => groupBy(state.items, (item) => item.name),
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((p, c) => p + c.price, 0),
        tot_: (state) => state.tot,
    },
    actions: {
        checkOut() {
            const authStore = userAuthStore();
            alert(
                `${authStore.username} just bought ${this.count} items at the price ${this.total}`
            );
        },
        addItems(count, product) {
            count = parseInt(count);
            let total = 0;
            for (let index = 0; index < count; index++) {
                this.items.push({...product });
                if (index === 0) total += 1 * product.price;
                total = count * product.price;
            }
            this.tot += total;
        },
        removeItem(name) {
            this.items = this.items.filter((prod) => prod.name === name);
        },
    },
});