import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

const UseCases = () => {
  const solutions = [
    {
      title: "Project Management",
      description: "Keep your projects on track with powerful planning tools, timelines, and progress tracking.",
      icon: "📊",
      features: ["Gantt charts", "Task dependencies", "Milestone tracking", "Resource allocation"]
    },
    {
      title: "Team Collaboration",
      description: "Bring your team together with real-time communication, file sharing, and collaborative workspaces.",
      icon: "👥",
      features: ["Real-time updates", "Comments & mentions", "File sharing", "Team chat"]
    },
    {
      title: "Task Tracking",
      description: "Organize and prioritize tasks with customizable boards, lists, and cards.",
      icon: "✅",
      features: ["Kanban boards", "Custom fields", "Due dates", "Priority levels"]
    },
    {
      title: "Workflow Automation",
      description: "Automate repetitive tasks and streamline your workflow with powerful automation rules.",
      icon: "⚡",
      features: ["Custom rules", "Automated actions", "Triggers", "Templates"]
    },
    {
      title: "Reporting & Analytics",
      description: "Gain insights into your team&apos;s performance with detailed reports and analytics.",
      icon: "📈",
      features: ["Custom dashboards", "Performance metrics", "Time tracking", "Export data"]
    },
    {
      title: "Integrations",
      description: "Connect Twillo with your favorite tools and services for seamless workflow.",
      icon: "🔗",
      features: ["100+ integrations", "API access", "Webhooks", "Custom integrations"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Solutions for Every Need
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover how Twillo can transform your team&apos;s productivity with our comprehensive suite of tools.
            </p>
          </FadeIn>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <StaggerItem key={index}>
              <div className="bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-3xl">{solution.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <span className="text-blue-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default UseCases;
