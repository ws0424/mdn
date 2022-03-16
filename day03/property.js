console.log(Number.POSITIVE_INFINITY);
function myIsNaN(a) {
  return a !== a;
}
console.log(myIsNaN(NaN));
console.log(isNaN("aa"));
console.log(Number.isNaN("aa"));
