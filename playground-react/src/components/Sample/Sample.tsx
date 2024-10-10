import {FC} from "react";
import {useUIContext} from "../../contexts/UIContext";

const Sample: FC = () => {
  const uiContext = useUIContext();
  console.log('context usage in the Sample component: ', uiContext.theme);

  return (
    <div>Sample</div>
  );
};

export default Sample;

// export default function Sample() {
//   return (
//     <div>Sample</div>
//   );
// }
