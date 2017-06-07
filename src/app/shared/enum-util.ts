/**
 * Created by arjinreyes on 14/03/2017.
 */
class EnumUtil {

  public static toArray(enumObject) {

    var all = []
    for(var key in enumObject) {
      all.push(FieldType[key]);
    }

    return all;
  }
}
