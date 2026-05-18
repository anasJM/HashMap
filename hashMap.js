function hashMap() {
    let loadFactor = 0.75
    let capacity = 16
    let buckets = new Array(capacity).fill(null)
    let size = 0

    // hash function
    function hash(key) {
        if (typeof key !== 'string') throw new Error('Keys must be strings');

        let hashCode = 0;
        const primeNumber = 31;

        // % inside the loop prevents integer overflow on long keys
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }

        return hashCode;
    }

    // get value from bucket
    function getBucket(index) {
        // out of bounds
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        return buckets[index];
    }

    // set value to bucket
    function set(key, value) {
        const index = hash(key)

        // out of bounds
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        // If bucket is empty, start a new linked list
        if (buckets[index] === null) {
            buckets[index] = [[key, value]]
            size++
        } else {
            // Bucket already has entries — check for collision
            const existing = buckets[index].find(element => element[0] === key)
            if (existing) {
                existing[1] = value
            } else {
                buckets[index].push([key, value])
                size++
            }
        }

        // Check if we need to grow
        if ((size / capacity) > loadFactor) {
            resize()
        }

    }

    // get element from buckets
    function get(key) {
        // hash the key
        const index = hash(key)

        // out of bounds
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const existing = buckets[index].find(element => element[0] === key)
        return existing ? buckets[index][1] : null
    }

    // check if key exist in buckets
    function has(key) {
        const element = get(key)
        return element === null ? false : true
    }

    return {
        set,
        get,
        has,
    }
}

export { hashMap }