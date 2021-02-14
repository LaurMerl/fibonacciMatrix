import './cell.component.scss';

export interface CellProps {
  props: {
    x: number;
    y: number;
    value: number;
    style: string;
  },
  handleClick: (x: number, y: number) => void
}

const Cell = ({props, handleClick}: CellProps) => {

  return (
    <div>
      <div
        className={`cell ${props.style}`}
        onClick={() => handleClick(props.x, props.y)}
      >{props.value}</div>
    </div>
  );
}

export default Cell