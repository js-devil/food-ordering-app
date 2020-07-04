export default (name) => {
  const nameArray = name.toLowerCase();

  // Rice
  return nameArray.includes("rice") && nameArray.includes("white")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892650/nandar/white-rice.png"
    : nameArray.includes("rice") && nameArray.includes("fried")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892652/nandar/fried-rice.png"
    : nameArray.includes("rice") && nameArray.includes("jollof")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892658/nandar/jollof.png"
    : // Beans
    nameArray.includes("beans")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892648/nandar/beans.jpg"
    : nameArray.includes("chicken")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892646/nandar/chicken.png"
    : nameArray.includes("cola") ||
      nameArray.includes("coca") ||
      nameArray.includes("coke")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892649/nandar/coke.png"
    : nameArray.includes("cake")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892653/nandar/cupcake.jpg"
    : // Swallow
    nameArray.includes("amala")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892646/nandar/amala-ewedu.png"
    : (nameArray.includes("eba") || nameArray.includes("garri")) &&
      nameArray.includes("egusi")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892651/nandar/eba-egusi.png"
    : (nameArray.includes("eba") || nameArray.includes("garri")) &&
      nameArray.includes("veg")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892652/nandar/eba-veg.png"
    : nameArray.includes("fish")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892654/nandar/fish.png"
    : nameArray.includes("fufu")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892652/nandar/fufu.png"
    : nameArray.includes("indomie")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892655/nandar/indomie.png"
    : nameArray.includes("meat")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892657/nandar/meat1.png"
    : nameArray.includes("meatpie")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892647/nandar/meatpie.png"
    : nameArray.includes("pepsi")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892643/nandar/pepsi.png"
    : nameArray.includes("plantain")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892643/nandar/plantain.jpg"
    : nameArray.includes("porridge")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892651/nandar/porridge.png"
    : nameArray.includes("shawarma")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892654/nandar/shawarma.png"
    : name.includes("spag") || nameArray.includes("spag")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892644/nandar/spag.png"
    : nameArray.includes("sausage")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892648/nandar/sausage.png"
    : nameArray.includes("water")
    ? "https://res.cloudinary.com/kingkunn/image/upload/v1593892644/nandar/water.png"
    : "https://res.cloudinary.com/kingkunn/image/upload/v1593893226/nandar/fast-food-3.jpg";
};
