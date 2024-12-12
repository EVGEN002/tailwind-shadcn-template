// import BaseLabel from "./BaseLabel";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// interface BaseSelectItemProps {
//   dictionary: any[];
//   itemValue: string | number | undefined | null;
//   setter: React.Dispatch<React.SetStateAction<any>>;
//   key: string;
// }

// const BaseSelectItem = ({ dictionary, itemValue, setter, key }: BaseSelectItemProps) => {
//   return (
//     <BaseLabel label="Вид пространнственных данных">
//       <Select
//         value={itemValue ? String(itemValue) : undefined}
//         onValueChange={(value) =>
//           setter((prev: any) => prev ? { ...prev, [key]: value } : null)
//         }
//       >
//         <SelectTrigger>
//           <SelectValue placeholder="Выберите вид пространнственных данных" />
//         </SelectTrigger>
//         <SelectContent>
//           {dictionary?.map((item: any) => (
//             <SelectItem>{item[]}</SelectItem>
//           ))}
//           {/* {baseDictionary.basetype?.map((item: any) => (
//             <SelectItem value={item?.id}>{item?.value}</SelectItem>
//           ))} */}
//         </SelectContent>
//       </Select>
//     </BaseLabel>
//   );
// };

// export default BaseSelectItem;
