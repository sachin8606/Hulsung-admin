function JSONtographql(data){
    let stringArray="[";
    data.forEach(image => {
      stringArray+="{"
      for (const key in image) {
        if( typeof(image[key]) =="string")
        stringArray+=`${key}:"${image[key]}",`
        else if(typeof(image[key]) =="boolean")
        stringArray+=`${key}:${image[key]},`
        else
        stringArray+=`${key}:${image[key]},`
        // else if(typeof(image[key]) == "number")
        // stringArray+=`${key}:${image[key]},`
      }
      stringArray+="},"
    });
    stringArray+="]";
    return stringArray;
}

export {JSONtographql};