import { cva } from "class-variance-authority";
import { cn } from "@styles/classNameMerge";

type Props = {
  className?: string;
  color?: "brand" | "accent";
};

export default function SubmitIcon({ className, color = "brand" }: Props) {
  const styles = cn([baseStyles({ color }), className]);

  return (
    <svg
      className={styles}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0.964132 11.9345C0.734577 12.0411 0.516499 12.0176 0.3099 11.8642C0.1033 11.7112 0 11.4882 0 11.1952V8.21798C0 8.03149 0.0459111 7.86498 0.137733 7.71845C0.229555 7.57192 0.355811 7.47868 0.516499 7.43872L5.50933 6.00007L0.516499 4.56142C0.355811 4.52146 0.229555 4.42821 0.137733 4.28168C0.0459111 4.13515 0 3.96864 0 3.78215V0.804952C0 0.511894 0.1033 0.288637 0.3099 0.135182C0.516499 -0.0177414 0.734577 -0.0409199 0.964132 0.0656466L11.5696 5.26076C11.8565 5.40729 12 5.65373 12 6.00007C12 6.34641 11.8565 6.59284 11.5696 6.73937L0.964132 11.9345Z" />
    </svg>
  );
}

const baseStyles = cva("w-5 h-5", {
  variants: {
    color: {
      brand: "fill-teal-400",
      accent: "fill-white-100",
    },
  },
});
