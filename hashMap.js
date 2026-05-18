function hashMap() {
    let loadFactor = 0.75
    let capacity = 16
    let buckets = new Array(capacity).fill(null)
    let size = 0

    // hash function
    function hash(key) {
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

        return this.buckets[index];
    }

}

export { hashMap }