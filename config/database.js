if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://kaousheik:jayakumar16@ds127655.mlab.com:27655/vidjot-dev'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}