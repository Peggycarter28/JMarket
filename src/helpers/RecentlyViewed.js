const getItems = () => {
    const stored = localStorage.getItem('recentlyViwed')

    if(stored)
    {return JSON.parse(stored)}

    return []
}


export class RecetlyViwedItems {
    constructor(maxSize=12) {
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
        return this.items;
    }
}


