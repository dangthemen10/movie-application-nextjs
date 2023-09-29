import Container from '@/components/Layout/Container';
import PersonMapping from '@/components/PersonMapping';

type Props = {
  people: IPopularTyping[];
};

const PeoplePopular: React.FC<Props> = ({ people }: Props) => {
  return (
    <div className="pt-36 overflow-x-hidden">
      <Container header="Popular">
        <div className="inline-block md:grid grid-cols-5 items-center">
          {people?.map((person) => (
            <PersonMapping key={person.id} person={person} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PeoplePopular;
