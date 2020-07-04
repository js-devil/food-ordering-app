export default (name) => {
  const nameArray = name.toLowerCase();

  // Rice
  return nameArray.includes("rice") && nameArray.includes("white")
    ? "white-rice.png"
    : nameArray.includes("rice") && nameArray.includes("fried")
    ? "fried-rice.png"
    : nameArray.includes("rice") && nameArray.includes("jollof")
    ? "jollof.png"
    : // Beans
    nameArray.includes("beans")
    ? "beans.png"
    : nameArray.includes("chicken")
    ? "chicken.png"
    : nameArray.includes("cola") ||
      nameArray.includes("coca") ||
      nameArray.includes("coke")
    ? "coke.png"
    : nameArray.includes("cake")
    ? "cupcake.png"
    : // Swallow
    nameArray.includes("amala")
    ? "amala-ewedu.png"
    : (nameArray.includes("eba") || nameArray.includes("garri")) &&
      nameArray.includes("egusi")
    ? "eba-egusi.png"
    : (nameArray.includes("eba") || nameArray.includes("garri")) &&
      nameArray.includes("veg")
    ? "eba-veg.png"
    : nameArray.includes("fish")
    ? "fish.png"
    : nameArray.includes("fufu")
    ? "fufu.png"
    : nameArray.includes("indomie")
    ? "indomie.png"
    : nameArray.includes("meat")
    ? "meat.png"
    : nameArray.includes("meatpie")
    ? "meatpie.png"
    : nameArray.includes("pepsi")
    ? "pepsi.png"
    : nameArray.includes("plantain")
    ? "plaintain.png"
    : nameArray.includes("porridge")
    ? "porridge.png"
    : nameArray.includes("shawarma")
    ? "shawarma.png"
    : name.includes("spag") || nameArray.includes("spag")
    ? "spag.png"
    : nameArray.includes("water")
    ? "water.png"
    : "jollof.png";
};
