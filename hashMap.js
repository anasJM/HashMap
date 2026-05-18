function HashMap() {
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

        let existing
        if (buckets[index] !== null) {
            existing = buckets[index].find(element => element[0] === key)
        }

        return existing ? existing[1] : null
    }

    // check if key exist in buckets
    function has(key) {
        const element = get(key)
        return element === null ? false : true
    }

    // remove element from buckets
    function remove(key) {
        // hash the key
        const index = hash(key)

        // out of bounds
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const elementIndex = buckets[index].findIndex(element => element[0] === key)

        if (elementIndex === -1) {
            return false
        }

        buckets[index].splice(elementIndex, 1)
        size--

        if (buckets[index].length === 0) {
            buckets[index] = null
        }

        return true

    }

    // size of buckets
    function length() {
        return size
    }

    // clear all the entries in the hashmap
    function clear() {
        buckets = new Array(capacity).fill(null)
        size = 0
    }

    // return all the keys in the hashmap
    function keys() {
        const allKeys = []

        buckets.forEach(bucket => {
            if (bucket) {
                bucket.forEach(element => {
                    allKeys.push(element[0])
                })
            }
        });

        return allKeys
    }

    // return all the values in the hashmap
    function values() {
        const allValues = []

        buckets.forEach(bucket => {
            if (bucket) {
                bucket.forEach(element => {
                    allValues.push(element[1])
                })
            }
        });

        return allValues
    }

    // return all pairs (key, value)
    function entries() {
        const allPairs = []

        buckets.forEach(bucket => {
            if (bucket) {
                bucket.forEach(element => {
                    allPairs.push([element[0], element[1]])
                })
            }
        });

        return allPairs
    }

    function resize() {
        // store the old buckets
        const oldBuckets = buckets
        // double the capacity
        capacity = capacity * 2
        // reset the buckets and the size
        buckets = new Array(capacity).fill(null)
        size = 0

        for (const bucket of oldBuckets) {
            if (bucket) {
                for (const [key, value] of bucket) {
                    set(key, value)
                }
            }
        }

    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    }
}

export default HashMap