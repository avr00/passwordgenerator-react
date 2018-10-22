export default function newPassword(lengthState, specialCharState) {
    const length = lengthState;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charSetWithSpecial =
      "!%&'()*+,-.:;<=>?@[]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const specialOrNot = specialCharState ? charSetWithSpecial : charset;
    let retVal = "";
    for (var i = 0, n = specialOrNot.length; i < length; ++i) {
      retVal += specialOrNot.charAt(Math.floor(Math.random() * n));
    }
    return retVal
  };