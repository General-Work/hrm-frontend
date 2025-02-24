import { ulid } from 'ulid';
import { promotionStaff } from '../duepromotion/promotionData';

export const mockInterviews: any[] = [
	{
		id: ulid(),
		type: { id: ulid(), name: 'Promotions' },
		startDate: new Date('2025-03-01'),
		endDate: new Date('2025-03-02'),
		panelMembers: [
			{
				id: ulid(),
				firstName: 'John',
				lastName: 'Doe',
				otherNames: '',
				staffIdentificationNumber: '12345',
				score: [85, 90]
			},
			{
				id: ulid(),
				firstName: 'Jane',
				lastName: 'Smith',
				otherNames: '',
				staffIdentificationNumber: '12346',
				score: [88, 92]
			}
		],
		candidates: promotionStaff,
		active: true,
		name: 'Technical Interview March 2025',
		department: { id: ulid(), departmentName: 'Technical' }
	},
	{
		id: ulid(),
		type: { id: ulid(), name: 'Promotions' },
		startDate: new Date('2025-03-05'),
		endDate: new Date('2025-03-06'),
		panelMembers: [
			{
				id: ulid(),
				firstName: 'Emily',
				lastName: 'Davis',
				otherNames: '',
				staffIdentificationNumber: '12349',
				score: [80, 85]
			},
			{
				id: ulid(),
				firstName: 'Michael',
				lastName: 'Wilson',
				otherNames: '',
				staffIdentificationNumber: '12350',
				score: [82, 87]
			}
		],
		candidates: promotionStaff,
		active: true,
		name: 'HR Interview March 2025',
		department: { id: ulid(), departmentName: 'Human Resource' }
	},
	{
		id: ulid(),
		type: { id: ulid(), name: 'Promotions' },
		startDate: new Date('2025-03-10'),
		endDate: new Date('2025-03-11'),
		panelMembers: [
			{
				id: ulid(),
				firstName: 'Sarah',
				lastName: 'Miller',
				otherNames: '',
				staffIdentificationNumber: '12353',
				score: [90, 95]
			},
			{
				id: ulid(),
				firstName: 'James',
				lastName: 'Anderson',
				otherNames: '',
				staffIdentificationNumber: '12354',
				score: [92, 97]
			}
		],
		candidates: promotionStaff,
		active: true,
		name: 'Management Interview March 2025',
		department: { id: ulid(), departmentName: 'Human Resource' }
	},
	{
		id: ulid(),
		type: { id: ulid(), name: 'Promotions' },
		startDate: new Date('2025-03-15'),
		endDate: new Date('2025-03-16'),
		panelMembers: [
			{
				id: ulid(),
				firstName: 'Laura',
				lastName: 'Martinez',
				otherNames: '',
				staffIdentificationNumber: '12357',
				score: [75, 80]
			},
			{
				id: ulid(),
				firstName: 'Robert',
				lastName: 'Garcia',
				otherNames: '',
				staffIdentificationNumber: '12358',
				score: [78, 83]
			}
		],
		candidates: promotionStaff,
		active: true,
		name: 'Sales Interview March 2025',
		department: { id: ulid(), departmentName: 'Information Technology' }
	},
	{
		id: ulid(),
		type: { id: ulid(), name: 'Promotions' },
		startDate: new Date('2025-03-20'),
		endDate: new Date('2025-03-21'),
		panelMembers: [
			{
				id: ulid(),
				firstName: 'Patricia',
				lastName: 'Harris',
				otherNames: '',
				staffIdentificationNumber: '12361',
				score: [85, 90]
			},
			{
				id: ulid(),
				firstName: 'Thomas',
				lastName: 'Clark',
				otherNames: '',
				staffIdentificationNumber: '12362',
				score: [88, 92]
			}
		],
		candidates: promotionStaff,
		active: true,
		name: 'Marketing Interview March 2025',
		department: { id: ulid(), departmentName: 'Information Technology' }
	}
];
