const getItems = () => {
    const stored = localStorage.getItem('recentlyViwed')

    if (stored) { return JSON.parse(stored) }

    return []
}


export class RecetlyViwedItems {
    constructor(maxSize = 12) {
        this.maxSize = maxSize;
        this.items = getItems();
    }

    add(item) {
        if (this.items.length >= this.maxSize) {
            // Remove the oldest item (first item)
            this.items.shift();
        }
        // Add the new item
        this.items.push(item);

        localStorage.setItem('recentlyViwed', JSON.stringify(this.items))

    }

    getItems() {
        const items = this.items

        if (items.length > 1) {
            const sortedItems = items.sort((a, b) => new Date(b.date_listed) - new Date(a.date_listed));
            return sortedItems;
        }
        else {
            return this.items
        }
    }
}


