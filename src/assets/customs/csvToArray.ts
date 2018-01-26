export function csvToArray(data) {
  // console.log(data);
  let test = data.slice(0, 350);
  console.log(test.charAt(331));
  console.log(test.charAt(332));
  // console.log(data.split(test.charAt(332)));
  let result=data.split(test.charAt(332));
  console.log(result[0]);
  console.log(result[2]);
  // console.log(test.charAt(333));
  // console.log(test.charAt(334));
  // console.log(test.charAt(335));
  // console.log(test.charAt(336));
  // console.log(test.charAt(337));
  // console.log(test.charAt(338));
  // console.log(test.charAt(339));
  // console.log(test.charAt(340));
  // console.log(test.charAt(341));
}
