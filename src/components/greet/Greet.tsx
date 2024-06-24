type Props = {
  name?: string;
};

export const Greet = (props: Props) => {
  return <div>Hello {props.name ? props.name : "Guest"}</div>;
};
