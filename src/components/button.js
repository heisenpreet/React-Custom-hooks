import "./button.css";
const HookBtn = (props) => {
  return (
    <div className="btndiv">
      <button onClick={props.btnFx} className="ripple">
        {props.title}
      </button>
    </div>
  );
};
export default HookBtn;
