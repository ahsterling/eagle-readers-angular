var filtersModule = angular.module('filtersModule', []);

filtersModule.filter('title', function() {
  return function(title) {
    return title.split(/\s\//)[0];
  }
})


// filtersModule.filter('subject', function() {
//   return function(books, subject) {
//     return books.filter(function(book) {
//       if (subject === "") {
//         return true;
//       } else {
//         if (book.subject_array.indexOf(subject) >= 0) {
//           return true;
//         } else {
//           return false;
//         };
//       };
//
//   };
// });

// filtersModule.filter('subject', function() {
//   return function(books, subject) {
//     return books.filter(function(book) {
//       if (subject === "") {
//         return true;
//       } else {
//         if (book.subject_array.indexOf(subject) >= 0) {
//           return true;
//         } else {
//           return false;
//         }
//       }
//     })
//   }
// })
