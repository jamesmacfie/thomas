import React from 'react';
import LayoutDashboard from '../../svg/layout-dashboard.svg';
import QuestionCircle from '../../svg/question-circle.svg';
import Armchair from '../../svg/armchair.svg';
import Cog from '../../svg/cog.svg';
import House from '../../svg/house.svg';
import Pencil from '../../svg/pencil.svg';
import Floppy from '../../svg/floppy-disk.svg';
import CheckCircle from '../../svg/check-circle.svg';
import AddCircle from '../../svg/add-circle.svg';

// TODO - should have a React element type here. Just not sure which one
const icons: { [s: string]: any } = {
  dashboard: LayoutDashboard,
  house: House,
  armchair: Armchair,
  cog: Cog,
  pencil: Pencil,
  floppy: Floppy,
  checkCircle: CheckCircle,
  addCircle: AddCircle
};

interface Props {
  icon: string;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

const Icon = ({ icon, ...props }: Props) => {
  const Cmp = icons[icon];
  return !!Cmp ? <Cmp {...props} /> : <QuestionCircle {...props} />;
};

export default Icon;
