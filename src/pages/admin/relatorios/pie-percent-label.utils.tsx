interface PiePercentLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
  payload?: { percentual?: number };
}

const MIN_ARC_WIDTH = 28;
const RADIAN = Math.PI / 180;

export const renderPiePercentLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent = 0,
  payload,
}: PiePercentLabelProps) => {
  const middleRadius = (innerRadius + outerRadius) / 2;

  if (percent * 2 * Math.PI * middleRadius < MIN_ARC_WIDTH) {
    return null;
  }

  const percentual = payload?.percentual ?? Math.round(percent * 100);

  return (
    <text
      x={cx + middleRadius * Math.cos(-midAngle * RADIAN)}
      y={cy + middleRadius * Math.sin(-midAngle * RADIAN)}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
    >
      {`${percentual}%`}
    </text>
  );
};
