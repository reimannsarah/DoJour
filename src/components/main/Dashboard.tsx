import Entries from '../sub/Entries';
import TextEntry from '../sub/TextEntry';
import Button from '../sub/Button';

export const Dashboard = () => {
  return (
    <div>
      <TextEntry />
      <Entries />
      <Button />
    </div>
  )
}
