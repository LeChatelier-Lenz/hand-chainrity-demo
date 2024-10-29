interface LaunchProps {
  customProp: string;
}

export default function Launch({ customProp }: LaunchProps) {
  return (
    <div id="launch">
      <p>{customProp}</p>
    </div>
  );
}