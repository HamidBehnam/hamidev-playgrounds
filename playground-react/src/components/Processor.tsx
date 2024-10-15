import {FC, ReactNode} from "react";

interface ProcessorProps {
  children: ReactNode | ((name: string, code: number) => ReactNode);
  render: (name: string, code: number) => ReactNode;
}

const Processor: FC<ProcessorProps> = ({children, render}) => {
  return (
    <div>
      {children instanceof Function ? children('hamid', 1) : children}
      {render('behnam', 2)}
    </div>
  );
};

export default Processor
