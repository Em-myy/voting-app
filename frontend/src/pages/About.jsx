import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const About = () => {
  return (
    <div className="dark:bg-[#366075] h-[100%] p-2">
      <Navbar />
      aaaaaaaaaaaaa
      bbbbbbbbbbb
      cccccccc
      <div className="text-5xl md:text-8xl text-center pb-2">About Us</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex flex-col gap-y-2">
          <div className="bg-[#747FB3] dark:bg-[#CAB8A0] text-[21px] md:text-[24px] p-2 rounded-3xl shadow-xl">
            Welcome to our Voting Platform. We created this system with one main
            purpose: to make voting easy, secure, and accessible to everyone. We
            believe that every voice matters, and every vote should be counted
            fairly. This platform provides a straightforward way for users to
            participate in elections, review options, and make informed choices
            without stress or confusion. Our voting process is designed to be
            simple. You can log in, view the candidates or options available,
            and cast your vote in just a few steps. No complicated forms, no
            unnecessary delays. We’ve built this platform to help encourage
            participation by keeping things clear and user-friendly. Security
            and transparency are at the heart of what we do. Each vote is
            recorded safely to prevent tampering and ensure accuracy. Once the
            voting process is complete, results are displayed in a fair and
            transparent manner. This ensures trust in the process and confidence
            in the final outcome.
          </div>
          <div className="bg-[#4C4F5E] dark:bg-[#755936] text-white text-[21px] md:text-[24px] p-2 rounded-3xl shadow-xl">
            Our Voting System is designed to provide a reliable and secure
            environment for conducting elections. We prioritize transparency,
            accessibility, and accuracy. The platform ensures that all users can
            cast their votes confidently, knowing that the process is designed
            to prevent tampering and maintain fairness. We are committed to
            empowering individuals and organizations to run credible elections
            while promoting trust and accountability. We believe that voting is
            an important responsibility, whether it’s for leadership positions,
            community decisions, or organizational choices. By providing a
            reliable platform, we aim to support meaningful and honest
            decision-making.
          </div>
        </div>
        <div className="bg-[#747FB3] dark:bg-[#CAB8A0] text-[21px] md:text-[24px] p-2 rounded-3xl shadow-xl">
          Welcome to our voting platform — a space created to amplify voices,
          encourage participation, and promote fairness in decision-making. We
          believe that every opinion matters and every choice has the power to
          shape the outcome of our community, organization, or institution.
          Whether you are here to elect leaders, support initiatives, or make
          decisions that affect your group, your presence here means you care —
          and that’s where change begins. Our goal is to make voting simple,
          transparent, and meaningful. We built this platform so that every
          individual can cast their vote confidently, without confusion or bias.
          With clear layouts, accessible features, and secure voting processes,
          we ensure that everyone has equal opportunity to be heard. No
          complicated steps. No hidden results. Just a straightforward, fair,
          and modern way to participate. We understand that voting is more than
          just selecting a name or choosing a side. It represents trust,
          responsibility, and the desire to contribute to something bigger.
          That’s why we are committed to protecting the integrity of every vote
          cast here. Each vote is recorded securely, counted accurately, and
          displayed transparently, so results remain fair and credible. But
          beyond the technology, this platform is about community. It is a place
          where ideas meet, voices come together, and decisions reflect the
          collective will of the people involved. Whether you are a student, a
          team member, a leader, or a community participant, this platform gives
          everyone the chance to influence what comes next. We invite you to use
          your voice with confidence. We encourage you to vote with purpose. And
          we thank you for being part of the community
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
