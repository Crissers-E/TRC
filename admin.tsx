import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import type { Application } from "@shared/schema";
import { 
  Shield, 
  LogOut, 
  FileText, 
  Clock, 
  Star, 
  GraduationCap,
  Eye,
  Trash2,
  Inbox,
  AlertCircle
} from "lucide-react";

export default function Admin() {
  const { isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const { data: applications = [], isLoading, error } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    enabled: isAuthenticated,
  });

  const deleteApplicationMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/applications/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Deleted",
        description: "The application has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete application.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logout();
    setLocation("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeleteApplication = (id: number) => {
    if (confirm("Are you sure you want to delete this application?")) {
      deleteApplicationMutation.mutate(id);
    }
  };

  const getStats = () => {
    const total = applications.length;
    const now = new Date();
    const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recent = applications.filter(app => new Date(app.submittedAt) > dayAgo).length;
    
    const positionCounts: Record<string, number> = {};
    applications.forEach(app => {
      positionCounts[app.position] = (positionCounts[app.position] || 0) + 1;
    });
    const topPosition = Object.keys(positionCounts).reduce((a, b) => 
      positionCounts[a] > positionCounts[b] ? a : b, "-"
    );
    
    const educationLevels = ["High School", "Associate Degree", "Bachelor's Degree", "Master's Degree", "PhD"];
    const avgEducationIndex = applications.length > 0 
      ? applications.reduce((sum, app) => sum + educationLevels.indexOf(app.education), 0) / applications.length
      : 0;
    const avgEducation = educationLevels[Math.round(avgEducationIndex)] || "-";

    return { total, recent, topPosition, avgEducation };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in as an administrator to access this page.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load applications. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-gray text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            Admin Dashboard - Trident Research Corporation
          </h1>
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Employment Applications</h2>
          <p className="text-gray-600">Review and manage submitted applications</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-corporate-blue text-3xl mr-4">
                  <FileText className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-green-600 text-3xl mr-4">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Recent (24h)</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-purple-600 text-3xl mr-4">
                  <Star className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Position</p>
                  <p className="text-lg font-bold text-gray-900">{stats.topPosition}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="text-orange-600 text-3xl mr-4">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Education</p>
                  <p className="text-lg font-bold text-gray-900">{stats.avgEducation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500">Loading applications...</div>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <Inbox className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No applications submitted yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Experience
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Education
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {app.firstName} {app.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{app.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{app.position}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.experience}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {app.education}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApplication(app)}
                            className="text-corporate-blue hover:text-blue-700"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteApplication(app.id)}
                            className="text-red-600 hover:text-red-700"
                            disabled={deleteApplicationMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Application Detail Modal */}
      <Dialog 
        open={!!selectedApplication} 
        onOpenChange={() => setSelectedApplication(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold text-gray-900">
              <FileText className="h-6 w-6 mr-2 text-corporate-blue" />
              Application Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h3>
                  <div className="space-y-3">
                    <div><strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</div>
                    <div><strong>Email:</strong> {selectedApplication.email}</div>
                    <div><strong>Age:</strong> {selectedApplication.age}</div>
                    <div><strong>Phone:</strong> {selectedApplication.phone || 'Not provided'}</div>
                    <div><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Professional Information</h3>
                  <div className="space-y-3">
                    <div><strong>Position:</strong> {selectedApplication.position}</div>
                    <div><strong>Experience:</strong> {selectedApplication.experience}</div>
                    <div><strong>Education:</strong> {selectedApplication.education}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Skills</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedApplication.skills || 'No skills listed'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Motivation</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedApplication.motivation}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
