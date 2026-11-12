import type { SVGProps } from 'react';

export type IconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'bolt'
  | 'close'
  | 'facebook'
  | 'instagram'
  | 'map-pin'
  | 'menu'
  | 'minus'
  | 'phone'
  | 'plus'
  | 'shopping-cart'
  | 'star'
  | 'youtube';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  name: IconName;
  size?: number;
};

export default function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
