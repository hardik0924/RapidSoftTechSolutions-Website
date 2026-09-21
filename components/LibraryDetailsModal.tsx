'use client';

import { useEffect } from 'react';
import StatusBadge from './StatusBadge';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface LibraryDetails {
  id: string;
  library_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  _count?: {
    members: number;
    plans: number;
  };
  members?: Member[];
}

interface LibraryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  library: LibraryDetails | null;
}

export default function LibraryDetailsModal({
  isOpen,
  onClose,
  library,
}: LibraryDetailsModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !library) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Library Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Library Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {library.library_name || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Status
                  </label>
                  <div className="mt-1">
                    <StatusBadge status={library.status as 'ACTIVE' | 'PAUSED' | 'EXPIRED'} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{library.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{library.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Joined Date
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(library.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-600">
                    Total Members
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-blue-900">
                    {library._count?.members || 0}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm font-medium text-green-600">
                    Total Plans
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-green-900">
                    {library._count?.plans || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Members */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Members
              </h3>
              {library.members && library.members.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {library.members.map((member) => (
                        <tr key={member.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            <div>{member.email}</div>
                            <div>{member.phone}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {formatDate(member.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No members yet.</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
