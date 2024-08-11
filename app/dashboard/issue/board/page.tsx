import type { Issue } from '@prisma/client';

import Board from './Board';

const data: Issue[] = [
  {
    id: 1,
    title: 'Fix login issue',
    description:
      '### Problem:\nUsers are unable to log in using their social media accounts, specifically Facebook and Google.\n\n### Solution:\n- Investigate the OAuth implementation.\n- Check API keys and permissions.\n- Update the SDKs if necessary.\n\n### Expected Outcome:\nUsers should be able to log in using their social media accounts without errors.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-15T09:00:00Z'),
    updatedAt: new Date('2024-08-01T11:30:00Z'),
    label: 'BUG',
    priority: 'HIGH',
  },
  {
    id: 2,
    title: 'Add user profile feature',
    description:
      '### Feature Description:\nImplement a user profile page where users can view and update their personal information, such as name, email, and profile picture.\n\n### Tasks:\n- Design the user interface.\n- Create backend API endpoints.\n- Implement frontend components for displaying and editing user data.\n\n### Notes:\n- Ensure data validation on both frontend and backend.\n- Add unit and integration tests for the new functionality.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
  {
    id: 3,
    title: 'Write API documentation',
    description:
      '### Documentation Goals:\nComplete the documentation for the new API endpoints, including:\n\n- **GET /users**: Retrieves a list of users.\n- **POST /users**: Creates a new user.\n- **PUT /users/{id}**: Updates an existing user.\n- **DELETE /users/{id}**: Deletes a user.\n\n### Details:\n- Use OpenAPI Specification (Swagger) for documenting the endpoints.\n- Ensure the documentation is clear, concise, and includes examples.\n\n### Deadline:\nDocumentation should be completed by the end of the sprint.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'DOCUMENTATION',
    priority: 'LOW',
  },
  {
    id: 4,
    title: 'Refactor codebase',
    description:
      '### Objective:\nRefactor the existing codebase to improve performance, readability, and maintainability.\n\n### Refactoring Areas:\n- **Database Queries:** Optimize complex SQL queries for better performance.\n- **Code Structure:** Reorganize the codebase to follow best practices.\n- **Error Handling:** Implement consistent error handling across all modules.\n\n### Expected Benefits:\n- Improved application speed.\n- Easier maintenance and onboarding for new developers.\n- Reduced technical debt.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'BUG',
    priority: 'HIGH',
  },
  {
    id: 5,
    title: 'Cancel deprecated feature',
    description:
      "### Action Required:\nRemove the deprecated feature from the latest release.\n\n### Steps to Follow:\n1. Identify all instances of the deprecated feature in the codebase.\n2. Remove the code and related assets.\n3. Update the documentation to reflect the removal.\n4. Communicate the change to the relevant stakeholders.\n\n### Impact:\nThis change will reduce the application's complexity and prevent future maintenance issues.",
    status: 'CANCELLED',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'LOW',
  },
  {
    id: 6,
    title: 'Optimize database queries',
    description:
      "### Problem:\nCurrent database queries are slow, leading to performance issues in the application.\n\n### Optimization Plan:\n- Analyze slow queries using the database's performance tools.\n- Add indexes to frequently queried columns.\n- Refactor complex joins and subqueries into more efficient structures.\n- Test the performance improvements in a staging environment.\n\n### Expected Outcome:\nImproved application response time and reduced server load.",
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'BUG',
    priority: 'HIGH',
  },
  {
    id: 7,
    title: 'Implement dark mode',
    description:
      '### Feature Overview:\nAdd a dark mode option to the application to improve usability in low-light environments.\n\n### Tasks:\n- Design the dark mode color scheme.\n- Implement a toggle switch for switching between light and dark modes.\n- Ensure compatibility across all screens and components.\n- Test the feature on multiple devices and screen sizes.\n\n### Additional Notes:\nConsider user preferences and save the dark mode setting in local storage or user profile settings.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
  {
    id: 8,
    title: 'Improve security measures',
    description:
      '### Security Enhancements:\n- **Authentication:** Implement two-factor authentication (2FA) for all users.\n- **Data Encryption:** Ensure all sensitive data is encrypted both at rest and in transit.\n- **Vulnerability Scanning:** Regularly scan the application for vulnerabilities and patch them promptly.\n- **Access Controls:** Review and update role-based access controls (RBAC) to ensure least privilege.\n\n### Expected Outcome:\nIncreased security and compliance with industry standards.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 9,
    title: 'Set up CI/CD pipeline',
    description:
      '### Objective:\nAutomate the build, test, and deployment processes using a CI/CD pipeline.\n\n### Pipeline Components:\n- **Build Automation:** Automatically build the application on every commit.\n- **Automated Testing:** Run unit and integration tests as part of the pipeline.\n- **Deployment:** Deploy to staging and production environments based on branch and tag configurations.\n- **Monitoring:** Set up alerts for failed builds and deployments.\n\n### Tools and Technologies:\nConsider using Jenkins, CircleCI, or GitHub Actions for the CI/CD setup.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'DOCUMENTATION',
    priority: 'MEDIUM',
  },
  {
    id: 10,
    title: 'User feedback survey',
    description:
      '### Goal:\nConduct a user feedback survey to gather insights on the new features and overall user experience.\n\n### Survey Contents:\n- **User Experience:** How easy is it to navigate the app?\n- **Feature Satisfaction:** Are the new features meeting your needs?\n- **General Feedback:** Any additional comments or suggestions?\n\n### Distribution:\n- Send the survey via email to all registered users.\n- Provide an incentive, such as a discount coupon, for completing the survey.\n\n### Analysis:\nCompile and analyze the survey results to identify key areas for improvement.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'DOCUMENTATION',
    priority: 'LOW',
  },
  {
    id: 11,
    title: 'Enhance reporting module',
    description:
      '### Objective:\nEnhance the reporting module to include more detailed analytics and visualizations.\n\n### New Features:\n- **Customizable Reports:** Allow users to create and save custom reports.\n- **Data Export:** Enable export of reports in CSV and PDF formats.\n- **Charts and Graphs:** Add visualizations like bar charts, line graphs, and pie charts.\n\n### Considerations:\n- Ensure that the new features are compatible with existing reports.\n- Optimize the performance of the reporting queries.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
  {
    id: 12,
    title: 'Migrate to new server infrastructure',
    description:
      '### Migration Plan:\nMigrate the application to a new server infrastructure for better scalability and performance.\n\n### Steps Involved:\n- **Assessment:** Review the current server setup and identify areas for improvement.\n- **Selection:** Choose the new server infrastructure (e.g., AWS, Azure, Google Cloud).\n- **Migration:** Transfer all data, applications, and configurations to the new servers.\n- **Testing:** Thoroughly test the application on the new infrastructure to ensure everything works as expected.\n- **Go Live:** Schedule the migration during a low-traffic period to minimize disruptions.\n\n### Expected Benefits:\nImproved performance, scalability, and reliability of the application.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 13,
    title: 'Develop mobile app version',
    description:
      '### Objective:\nDevelop a mobile app version of the web application for iOS and Android platforms.\n\n### Tasks:\n- **Design:** Create mobile-friendly designs based on the existing web application.\n- **Development:** Implement the mobile app using React Native.\n- **Testing:** Test the app on multiple devices and OS versions.\n- **Deployment:** Deploy the app to the App Store and Google Play Store.\n\n### Additional Notes:\nEnsure feature parity between the web and mobile versions.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 14,
    title: 'Update third-party dependencies',
    description:
      '### Task Overview:\nUpdate all third-party dependencies to their latest versions.\n\n### Steps:\n- **Audit:** List all dependencies and their current versions.\n- **Update:** Update each dependency and resolve any conflicts or issues that arise.\n- **Test:** Run the full test suite to ensure nothing is broken by the updates.\n- **Document:** Update the documentation to reflect the changes in dependencies.\n\n### Considerations:\nPay special attention to major version updates, as they may introduce breaking changes.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'BUG',
    priority: 'MEDIUM',
  },
  {
    id: 15,
    title: 'Implement payment gateway',
    description:
      '### Feature Description:\nIntegrate a payment gateway to allow users to make purchases within the application.\n\n### Steps:\n- **Gateway Selection:** Choose a payment gateway provider (e.g., Stripe, PayPal, Square).\n- **Integration:** Implement the payment gateway API into the application.\n- **Testing:** Test the payment process using both test and live credentials.\n- **Security:** Ensure that all payment data is securely handled and PCI compliant.\n\n### Expected Outcome:\nUsers should be able to complete transactions securely and efficiently.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 16,
    title: 'Redesign landing page',
    description:
      '### Goal:\nRedesign the landing page to improve conversion rates and overall user experience.\n\n### Design Focus:\n- **Visual Appeal:** Update the design to be more modern and engaging.\n- **Content:** Optimize the content for clarity and persuasion.\n- **Call to Action:** Make the primary call to action more prominent and compelling.\n- **Responsive Design:** Ensure the landing page looks great on all devices, including mobile.\n\n### Expected Outcome:\nIncreased user engagement and higher conversion rates.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
  {
    id: 17,
    title: 'Fix broken links on website',
    description:
      '### Problem:\nThere are several broken links across the website, leading to a poor user experience.\n\n### Solution:\n- **Audit:** Identify all broken links using a tool like Screaming Frog or Google Search Console.\n- **Fix:** Update or remove broken links as necessary.\n- **Redirects:** Set up 301 redirects for any removed pages to relevant content.\n- **Testing:** Re-crawl the site to ensure all links are now working correctly.\n\n### Expected Outcome:\nImproved user experience and better SEO performance.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'BUG',
    priority: 'LOW',
  },
  {
    id: 18,
    title: 'Set up monitoring and alerts',
    description:
      '### Objective:\nImplement monitoring and alerting systems to ensure the application is running smoothly and to detect issues early.\n\n### Tasks:\n- **Monitoring Tools:** Set up tools like New Relic, Datadog, or Prometheus to monitor key metrics.\n- **Alerting:** Configure alerts for critical issues, such as high server load, errors, and downtime.\n- **Dashboards:** Create dashboards for real-time monitoring of application performance.\n- **Documentation:** Document the monitoring setup and alerting configurations for future reference.\n\n### Expected Outcome:\nProactive identification and resolution of issues, leading to improved application reliability.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 19,
    title: 'Conduct code review',
    description:
      '### Goal:\nConduct a thorough code review of the new features implemented in the last sprint.\n\n### Review Focus:\n- **Code Quality:** Ensure that the code follows best practices and is free of technical debt.\n- **Security:** Identify any potential security vulnerabilities in the new code.\n- **Performance:** Check for any performance issues or bottlenecks.\n- **Testing:** Verify that the code is well-tested and covered by unit and integration tests.\n\n### Outcome:\nProvide feedback to the development team and ensure that any issues are addressed before the next release.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'DOCUMENTATION',
    priority: 'MEDIUM',
  },
  {
    id: 20,
    title: 'Update user permissions',
    description:
      '### Objective:\nReview and update user permissions to ensure proper access control across the application.\n\n### Tasks:\n- **Audit:** Review the current user roles and permissions.\n- **Update:** Modify roles and permissions based on the latest requirements.\n- **Testing:** Test the updated permissions to ensure they are working as expected.\n- **Documentation:** Update the documentation to reflect the new permissions structure.\n\n### Expected Outcome:\nEnhanced security and appropriate access control across all user roles.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 21,
    title: 'Automate data backups',
    description:
      "### Goal:\nSet up automated backups for the application's databases and files to prevent data loss.\n\n### Steps:\n- **Schedule Backups:** Set up daily backups for databases and weekly backups for file storage.\n- **Storage:** Store backups in a secure, off-site location, such as AWS S3 or Google Cloud Storage.\n- **Testing:** Regularly test backup restoration to ensure data integrity.\n- **Documentation:** Document the backup procedures and storage locations for future reference.\n\n### Expected Outcome:\nReliable data backup and recovery processes in case of a failure or data loss event.",
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 22,
    title: 'Create a customer support portal',
    description:
      '### Objective:\nDevelop a customer support portal where users can submit tickets, access FAQs, and track their requests.\n\n### Features:\n- **Ticket Submission:** Allow users to submit support tickets directly through the portal.\n- **FAQ Section:** Provide a searchable FAQ section for common issues and questions.\n- **Ticket Tracking:** Enable users to track the status of their tickets in real-time.\n- **Knowledge Base:** Build a knowledge base with articles and guides to help users solve issues on their own.\n\n### Expected Outcome:\nImproved customer support experience and reduced load on support staff.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
  {
    id: 23,
    title: 'Implement email notifications',
    description:
      '### Feature Description:\nAdd email notifications to alert users of important events, such as account updates, password changes, and new messages.\n\n### Steps:\n- **Template Design:** Create email templates for different types of notifications.\n- **Backend Integration:** Implement the backend logic to trigger notifications based on user actions.\n- **Email Service:** Set up an email service (e.g., SendGrid, Mailgun) to send notifications.\n- **Testing:** Test email delivery and ensure that notifications are correctly triggered.\n\n### Expected Outcome:\nUsers will be promptly notified of important events, improving communication and user experience.',
    status: 'TODO',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'HIGH',
  },
  {
    id: 24,
    title: 'Conduct usability testing',
    description:
      '### Objective:\nConduct usability testing for the new features introduced in the latest release.\n\n### Focus Areas:\n- **User Navigation:** How easily can users navigate through the new features?\n- **Feature Understanding:** Are users able to understand and use the new features effectively?\n- **Pain Points:** Identify any pain points or areas of confusion for users.\n\n### Methodology:\n- **Participants:** Recruit a diverse group of users for testing.\n- **Scenarios:** Create realistic scenarios for users to complete using the new features.\n- **Feedback Collection:** Gather feedback through surveys, interviews, and observation.\n\n### Expected Outcome:\nIdentify areas for improvement and make necessary adjustments to enhance user experience.',
    status: 'DONE',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'DOCUMENTATION',
    priority: 'MEDIUM',
  },
  {
    id: 25,
    title: 'Enhance accessibility features',
    description:
      '### Goal:\nImprove the accessibility of the application to ensure it is usable by people with disabilities.\n\n### Enhancements:\n- **Keyboard Navigation:** Ensure that all interactive elements are accessible via keyboard.\n- **Screen Reader Support:** Improve compatibility with screen readers by adding ARIA labels and roles.\n- **Color Contrast:** Adjust color schemes to meet WCAG guidelines for contrast ratios.\n- **Text Resizing:** Allow users to easily resize text without breaking the layout.\n\n### Expected Outcome:\nA more inclusive application that is accessible to a broader audience.',
    status: 'IN_PROGRESS',
    createdAt: new Date('2024-07-20T12:00:00Z'),
    updatedAt: new Date('2024-08-05T14:45:00Z'),
    label: 'FEATURE',
    priority: 'MEDIUM',
  },
];

export default function Page() {
  return <Board data={data} />;
}
