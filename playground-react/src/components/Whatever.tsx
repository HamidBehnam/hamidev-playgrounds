export default function Whatever({name, code} : {name: string, code: number}) {
  return (
    <div>
      <div>{name} - {code}</div>
    </div>
  );
}
