export default function QuoteDisplay({ title }) {
  return <h2 style={titleStyle}>{title}</h2>;
}

const titleStyle = {
  background: "rgba(0,0,0,0.5)",
  padding: "10px 15px",
  // borderRadius: "12px",
  // width: "100%",
  // maxWidth: "400px",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.027)",
  // display: "flex",
  // flexDirection: "column",
  // gap: "12px",
};
